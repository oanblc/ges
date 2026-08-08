---
konu: Fatura kalem sözlüğü + şirket format farkları (parser referansı)
guncelleme: 2026-08-08
durum: yayin (Ozan onayi 6 Agu 2026)
teyit: reaktif sınır eşikleri kaynaklar arasında farklı — EPDK Tarifeler Yönetmeliği'nden kesinleştirilecek
---

# Fatura Kalem Sözlüğü ve Şirket Formatları (2026)

## Ana tespit
Kalemler EPDK formatında standart; farklar ADLANDIRMA + endeks bloğu yerleşimi + ek alanlarda.

## Parser eş anlamlılar tablosu
- Aktif enerji: "Enerji Tüketim Bedeli" = "Enerji Bedeli" = "Elektrik Tüketim Tutarı" = "Aktif Enerji Bedeli" = "Perakende Satış Bedeli"(eski) = zaman dilimli satırlar (Gündüz/Puant/Gece).
- Dağıtım: "Dağıtım Bedeli" = "Elk. Dağıtım" = "Sistem Kullanım Bedeli" = "Dağıtım Sistemi Kullanım Bedeli". (2016'dan beri iletim+sayaç okuma+kayıp-kaçak+PSH'yi İÇERİR; eski faturalarda 4 ayrı satır.)
- Vergi: "BTV" = "Belediye Tüketim Vergisi" = "ETV/Elektrik Tüketim Vergisi"(Zorlu OEPSAŞ) = "Elektrik ve Havagazı Tük. Ver."(Enerjisa).

## Şirket özellikleri (öne çıkanlar)
- Enerjisa: "Ek Tüketim Bedeli" (dönem içi fiyat/kademe düzeltmesi) kendine özgü satır.
- Aydem/ADM: en zengin terim seti — "Enerji Bedeli Tüm", Ri/Rc Oran, EIC kodu, "Yuvarlama Tutarı".
- CK: "Şeffaf Fatura" interaktif açıklama; 5 temel kalem.
- Zorlu OEPSAŞ: BTV'yi "ETV" yazar. YEPAŞ: kimlik alanı "Sözleşme Hesap Numarası".

## Kalem sözlüğü (tümü)
Ana: aktif enerji (meskende kademe satırları ayrı olabilir), dağıtım, güç bedeli (çift terim, kW×fiyat sabit), güç aşım bedeli (demand ölçümlü), reaktif endüktif/kapasitif bedel (sınır aşımında; ≥50 kVA %20/%15, küçüklerde %33/%20 aktarımları — TEYİT), YEKDEM (ulusal tarifede GÖMÜLÜ; ikili anlaşmada AYRI SATIR; SKTT formül bileşeni), dengeleme "(+/-) Tutar", sabit maliyet/hizmet bedeli (ikili marj).
Vergi/fon: BTV (mesken/tic %5, sanayi %1), Enerji Fonu (%0,5-1; sanayide kalktı), TRT (yalnız 2021 öncesi), KDV (mesken/tarım %10, diğer %20; matrah=bedeller+BTV+fon).
Diğer: gecikme zammı, kesme-bağlama, öteleme/taksit, yuvarlama farkı, MUHTELİF MAHSUP/TENZİL (GES alacağı), Ek Tüketim Bedeli.

## Endeks blokları
- Tüketim = (son−ilk) × ÇARPAN (trafo oranı; ör. 200/5→40; meskende 1). Sayaç etiketi ↔ fatura çarpanı kontrol noktası.
- Çok zamanlı: T1 Gündüz 06-17 / T2 Puant 17-22 / T3 Gece 22-06; toplam = aktif toplam olmalı.
- Reaktif: Ri/Rc endeksleri + oran gösterimi. Demand: aylık maks kW (çift terimde güç aşımı parametresi).
- Kimlik: Sözleşme Hesap No, Tesisat/Tekil Kod, sayaç seri, abone grubu, tarife kodu, tüketici sınıfı, EIC.

## E-fatura yapısı
- GİB UBL-TR 1.2.1; kalemler InvoiceLine, birim KWH; vergiler TaxSubtotal'da ayrı kodlarla; ETTN=UUID (mükerrer tespiti anahtarı); senaryo TEMELFATURA/TICARIFATURA.

## GES'li fatura
- Veriş/çekiş ayrı bloklar; alacak "Muhtelif Mahsup/Tenzil" (negatif); veriş>çekiş'te gerçek kişiye gider pusulası + üretici alacak belgesi; mahsubun hangi bedelden düşüldüğü şirkete göre değişir (kontrol noktası).

## Anomali kalıpları → belirti
- Çarpan hatası: tüketim endeks farkının katı değil / etiket≠fatura / trafo değişimi sonrası kat sıçraması.
- Okuma hatası: son<ilk, "tahmini okuma", açıklamasız günlük ortalama sapması.
- Kademe hatası: kademe satır toplamı ≠ toplam; yıllık kümülatif sıfırlama yanlışlığı.
- Reaktif sürpriz: ilk kez Ri/Rc bedeli; oran sınır üstü → kompanzasyon arızası (GES sonrası klasik).
- SKTT'ye düşme: tedarikçi adının GTŞ'ye dönmesi + birim fiyatın ~2 katına çıkması ((PTF+YEKDEM)×katsayı).
- Çift fatura: aynı dönem iki ETTN. Yanlış tarife grubu: birim fiyat EPDK tablosuyla uyuşmaz.
- İtiraz: şirket (10-15 iş günü) → EPDK; EPDK "Fatura Hesaplama Modülü" ile doğrulama.

## Kaynaklar
Enerjisa (3 sayfa), CK Boğaziçi (2), Aydem Perakende, OEPSAŞ, Aksa, EÇE (4), Enerji360, Egemert,
Covolt (4), Akıllı Tarife (2), Memurlar.net, Sepaş, Gediz, Witteh, Gündem Enerji, Mullinix,
Entegro, ENOPTIMAL, Piagrid, BirFatura, GİB e-Belge, Sopyo, BKA Hukuk, Enerji Uzmanları Derneği,
Gazelektrik. (Erişim: 6 Ağustos 2026)

## Devlet desteği satırı (mesken) — 8 Ağu 2026 eklemesi (Ozan onaylı ST araştırmasından)
- Tedarikçi SMS/faturalarındaki "tüketim bedeli X TL olup devlet desteği ... mahsuplaştırıldıktan
  sonra ödenecek tutar Y TL" kalıbı: devletin mesken ulusal tarifesindeki AKTİF ENERJİ bedeline
  uyguladığı sübvansiyonun görünür gösterimi. GES'le, hibeyle veya başvuruyla İLGİSİ YOK.
- Kapsam: mesken abonelerine OTOMATİK; başvuru gerekmez. Sınır: yıllık tüketim 4.000 kWh'i
  (≈ aylık 333 kWh ≈ ~984 ₺ tüketim) aşan mesken destekli tarifeden çıkar, SKTT'ye geçer
  (EPDK 30.10.2025 kararı, 2026 limiti; 2025'te 5.000 idi — eşik DARALIYOR). Ticarethane/sanayi
  eşiği 15.000 kWh/yıl. Tesisat bazlı uygulanır.
- Destek yalnız aktif enerjiye; dağıtım bedeli ve vergilere destek yok. Süresi: kampanya değil,
  EPDK tarife kararlarıyla süren düzen — bitiş tarihi yok ama kapsam her yıl kısılıyor
  (asistan: "GES'in konut gerekçesini güçlendiren trend" bağlamıyla anlatabilir).
