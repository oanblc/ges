---
konu: Fatura analiz protokolü — asistanın "fatura yükle, analiz edeyim" yeteneğinin algoritması
guncelleme: 2026-08-06
durum: yayin (Ozan onayi 6 Agu 2026)
dogrulama: Gerçek Enerjisa AYESAŞ sanayi OG ikili anlaşma faturasında test edildi (Temmuz 2026) — tüm çapraz kontroller tuttu
---

# Fatura Analiz Protokolü (v2)

## Adım 1 — Kimlik ve rejim tespiti
- Tedarikçi adı + tesisat adresi ilini karşılaştır: tedarikçi ≠ bölgenin GTŞ'si → İKİLİ ANLAŞMA.
- "Tüketici Grubu" satırını oku: abone grubu (mesken/ticarethane/sanayi/tarım), gerilim (AG/OG),
  terim (tek/çift), zaman (tek/çok zamanlı), "Serbest Tüketici" ibaresi.
- Fatura dönemi → hangi tarife dönemi ve hangi ay PTF/YEKDEM verisi kullanılacak.

## Adım 2 — Endeks doğrulaması
- Her endeks satırı: son − ilk = fark; fark × çarpan (varsa) = tüketim. Aktif toplamla karşılaştır.
- Çok zamanlı endeksler (gündüz/puant/gece) toplamı = aktif toplam olmalı.
- Reaktif oranlar: endüktif ÷ aktif ve kapasitif ÷ aktif → sınırlarla kıyasla
  (≤9 kW muaf; 9-29,9 kW %33/%20; üzeri %20/%15). Sınır aşımı yokken ceza satırı varsa ANOMALİ.

## Adım 3 — Birim fiyat ayrıştırma (analizin kalbi)
- Aktif enerji bedeli ÷ tüketim = birim fiyat.
- ULUSAL TARİFELİYSE: birim fiyat, EPDK tablosundaki abone grubu enerji bedeliyle eşleşmeli
  (meskende kademe ağırlıklı ortalama olarak). Eşleşmiyorsa → ikili anlaşma veya SKTT şüphesi.
- İKİLİ ANLAŞMALIYSA: dipnot/mesaj kutusunda bileşen dökümü ara (Enerji + YEKDEM + Sabit Maliyet).
  Her bileşeni kWh'e böl ve çapraz doğrula:
  * Enerji bileşeni ≈ dönem ort. PTF (kb/veri/piyasa-canli.json) → PTF+marj tipi; sapma % = marj.
  * YEKDEM bileşeni ≈ dönemin TAHMİNİ YEKDEM kararı (14718 vb.) → hangi karar uygulandığını söyle.
  * Sabit maliyet = tedarikçi marjı/dengeleme.
  * Örnek (doğrulanmış): 2,7486 (PTF Tem 2,6996 + %1,8) + 0,4240 (=14718 Temmuz 423,99) + 0,1586 = 3,3313 ✓
- SKTT ŞÜPHESİ: birim fiyat ≈ (PTF+YEKDEM)×1,05..1,09 ise SKTT'ye düşmüş olabilir → kullanıcıya bildir
  ("ikili anlaşmanız sonlanmış görünüyor").

## Adım 4 — Dağıtım bedeli doğrulaması
- Dağıtım bedeli ÷ tüketim = birim dağıtım → EPDK tablosuyla kuruş hassasiyetinde eşleşmeli
  (örn. OG sanayi tek terim 118,2457 kr ✓). Eşleşmiyorsa: yanlış abone grubu tarifesi uygulanmış
  olabilir (sık hata) veya çift terim (güç bedeli ayrı satır olmalı).
- İkili anlaşma dağıtımı DEĞİŞTİRMEZ — değişmişse anomali.

## Adım 5 — Vergi doğrulaması
- BTV ≈ enerji bedeli × (mesken/ticarethane %5, sanayi %1); Enerji Fonu %1.
- KDV: matrah = tüm kalemler; oran mesken/tarım %10, ticarethane/sanayi %20. Matrahı yeniden hesapla.

## Adım 6 — GES'li fatura ek kontrolleri
- Veriş/çekiş endeksleri ayrı mı; mahsup satırı ("muhtelif mahsup/tenzil") var mı, tutarı
  beklenen üretimle uyumlu mu; mesken=aylık, işletme=saatlik netleşme uygulanmış mı;
  üretici veriş dağıtım bedeli kesintisi doğru mu.

## Adım 7 — Çıktı formatı (kullanıcıya)
1. Tek cümle özet: abone tipi + fiyatlama rejimi + "fatura tutarlı/şu anomali var".
2. Bileşen tablosu (₺/kWh'e indirgenmiş, her satırda çapraz doğrulama sonucu ✓/⚠).
3. Anomaliler ve önerilen aksiyon (itiraz/tedarikçiyle görüşme/kademe-tarife optimizasyonu).
4. GES bağlantısı: "sizin tasarruf edeceğiniz kWh değeri = X ₺" (ikili fiyat + dağıtım + vergiler)
   → fizibilite motoruna girdi.

## v2 eklemeleri (araştırmayla çözüldü)
- SÖZLEŞME TİPİ TEŞHİS SIRASI: (1) fiyat ay-ay sabit → sabit fiyat; (2) EPDK tarifesine oran sabit → iskonto;
  (3) (AOPTF+YEKDEM)'e oran 1,0938 → SKTT; (4) oran sabit ≠ → PTF×katsayı; (5) fark sabit → PTF+marj.
- AOPTF: saatlik tüketim ağırlıklı PTF (aritmetik ortalama değil) — profil gündüz yoğunsa ort. altı.
- "(+/-) Tutar" = uzlaştırma düzeltmesi (tahmini↔gerçekleşen YEKDEM farkı + DUY geçmişe dönük düzeltme). ÇÖZÜLDÜ.
- "Diğer"deki ayrı YEKDEM = geçmiş dönem farkı; cari ay YEKDEM'i aktif enerji bloğunda. ÇÖZÜLDÜ.
- Adım 3'e ek: sabit fiyatlı sözleşmede YEKDEM satırı görünmemeli; görünüyorsa "sabit+YEKDEM geçişli".
- Adım 6'ya ek: spot endekslide GES'in AOPTF'yi düşüren İKİNCİ KADEME etkisi raporlanmalı; çift terimlide
  güç bedeli otomatik düşmez (demand analizi ayrı). Tedarikçi değişikliği mahsup sözleşmesini bozmaz.
- Eş anlamlı kalem sözlüğü + anomali belirti tablosu: bkz. fatura-kalem-sozlugu.md.
