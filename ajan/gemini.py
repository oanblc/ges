"""Gemini REST adaptörü — sohbet, karşılama kapısı, fatura okuma ve mevzuat araması.

Anthropic tarafındaki mesaj/araç biçimini Gemini generateContent biçimine çevirir.
Denetçi (_denetle), lead özeti ve web-aramalı cron ajanları Anthropic'te kalır;
model seçim gerekçesi: kb bağlamı verildiğinde Flash aynı doğrulukta ve ~15 kat
ucuz, ancak kendi ezberine dayandığı görevlerde yanlış alarm üretiyor (benchmark
2026-08-08, /tmp/quiz-sonuc.json).
"""

import json
import os

import httpx

MODEL = os.environ.get("GEMINI_MODEL", "gemini-3-flash-preview")
_TABAN = "https://generativelanguage.googleapis.com/v1beta/models"


def _anahtar() -> str:
    a = os.environ.get("GEMINI_API_KEY")
    if not a:
        raise RuntimeError("GEMINI_API_KEY tanımlı değil")
    return a


# Gemini'nin şema alt kümesi — desteklemediği anahtarlar (additionalProperties vb.) ayıklanır
_SEMA_IZINLI = {"type", "description", "enum", "items", "properties", "required",
                "minimum", "maximum"}


def _sema(s):
    if not isinstance(s, dict):
        return s
    y = {}
    for k, v in s.items():
        if k == "properties":
            y[k] = {ad: _sema(alt) for ad, alt in v.items()}
        elif k == "items":
            y[k] = _sema(v)
        elif k in _SEMA_IZINLI:
            y[k] = v
    return y


def parcalar(icerik):
    """Anthropic içerik bloklarını (str | blok listesi) Gemini parts'a çevirir."""
    if isinstance(icerik, str):
        return [{"text": icerik}]
    sonuc = []
    for b in icerik:
        if not isinstance(b, dict):
            continue
        if b.get("type") == "text":
            sonuc.append({"text": b["text"]})
        elif b.get("type") in ("image", "document"):
            k = b.get("source") or {}
            sonuc.append({"inlineData": {"mimeType": k.get("media_type"),
                                         "data": k.get("data")}})
    return sonuc


def _govde(sistem, icerikler, araclar=None, zorunlu_arac=None, max_cikti=6144):
    g = {
        "contents": icerikler,
        "systemInstruction": {"parts": [{"text": sistem}]},
        "generationConfig": {"maxOutputTokens": max_cikti},
    }
    if araclar:
        g["tools"] = [{"functionDeclarations": [
            {"name": a["name"], "description": a.get("description", ""),
             "parameters": _sema(a["input_schema"])} for a in araclar]}]
    if zorunlu_arac:
        g["toolConfig"] = {"functionCallingConfig": {
            "mode": "ANY", "allowedFunctionNames": [zorunlu_arac]}}
    return g


def uret(sistem, icerikler, araclar=None, zorunlu_arac=None, max_cikti=2048, sure=90):
    """Akışsız çağrı — candidates[0].content.parts listesini döndürür."""
    with httpx.Client(timeout=sure) as istemci:
        y = istemci.post(f"{_TABAN}/{MODEL}:generateContent",
                         params={"key": _anahtar()},
                         json=_govde(sistem, icerikler, araclar, zorunlu_arac, max_cikti))
        if y.status_code != 200:
            raise RuntimeError(f"Gemini {y.status_code}: {y.text[:300]}")
        d = y.json()
    return (d.get("candidates") or [{}])[0].get("content", {}).get("parts", [])


def akis(sistem, icerikler, araclar=None, max_cikti=6144, sure=180):
    """Akışlı çağrı — gelen her chunk'ın parts listesini sırayla üretir."""
    with httpx.Client(timeout=sure) as istemci:
        with istemci.stream(
            "POST", f"{_TABAN}/{MODEL}:streamGenerateContent",
            params={"key": _anahtar(), "alt": "sse"},
            json=_govde(sistem, icerikler, araclar, max_cikti=max_cikti),
        ) as y:
            if y.status_code != 200:
                detay = y.read().decode("utf-8", "ignore")[:300]
                raise RuntimeError(f"Gemini {y.status_code}: {detay}")
            for satir in y.iter_lines():
                if not satir.startswith("data: "):
                    continue
                d = json.loads(satir[6:])
                for p in (d.get("candidates") or [{}])[0].get("content", {}).get("parts", []):
                    yield p


def arac_cagrisi(parca_listesi, ad):
    """parts içinden istenen functionCall'un args'ını döndürür (yoksa None)."""
    for p in parca_listesi:
        fc = p.get("functionCall")
        if fc and fc.get("name") == ad:
            return fc.get("args") or {}
    return None
