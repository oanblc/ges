import type { Metadata } from "next";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Gizlilik ve KVKK Aydınlatma Metni",
  description:
    "gesdanışmanı'nda hangi kişisel veriler, hangi amaçla işlenir; saklama süreleri ve KVKK kapsamındaki haklarınız.",
  alternates: { canonical: "/gizlilik" },
  robots: { index: true, follow: true },
};

export default function Gizlilik() {
  return (
    <div className="wrap">
      <SiteHead aktif="diger" />
      <main id="icerik">
        <div className="calc-ust">
          <span className="sub-title">
            <SunDolu />
            Gizlilik
          </span>
          <h1>Kişisel Verilerin Korunması — Aydınlatma Metni</h1>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, gesdanışmanı
            platformunu kullanırken işlenen kişisel verilerinize ilişkin bilgilendirme aşağıdadır.
            Son güncelleme: 8 Ağustos 2026.
          </p>
        </div>

        <article className="yazi" style={{ paddingTop: 8 }}>
          <div className="yazi-ana">
            <h2>Hangi veriler işlenir?</h2>
            <div className="d-list" style={{ maxWidth: "76ch" }}>
              <div className="d-item d-ok">
                <span className="dot" aria-hidden="true" />
                <div>
                  <b>Sohbet içerikleri</b>
                  <p>
                    Asistana yazdığınız mesajlar, hizmet kalitesini ölçmek ve cevap doğruluğunu
                    denetlemek amacıyla kaydedilir. Sohbete kimlik bilgisi yazmamanızı öneririz.
                  </p>
                </div>
              </div>
              <div className="d-item d-ok">
                <span className="dot" aria-hidden="true" />
                <div>
                  <b>Fatura görselleri</b>
                  <p>
                    Yüklediğiniz fatura fotoğrafı/PDF'i yalnızca o analiz için işlenir; analiz
                    amacı dışında kullanılmaz, üçüncü taraflara pazarlama amacıyla aktarılmaz.
                    Faturanızda ad, adres ve abone numarası gibi kişisel veriler bulunabilir;
                    dilerseniz bu alanları kapatarak yükleyebilirsiniz.
                  </p>
                </div>
              </div>
              <div className="d-item d-ok">
                <span className="dot" aria-hidden="true" />
                <div>
                  <b>İletişim bilgisi (isteğe bağlı)</b>
                  <p>
                    Danışmanlık talebi bıraktığınızda verdiğiniz telefon/e-posta, yalnızca size
                    dönüş yapmak amacıyla, ilgili sohbet özetiyle birlikte saklanır.
                  </p>
                </div>
              </div>
              <div className="d-item d-sart">
                <span className="dot" aria-hidden="true" />
                <div>
                  <b>Teknik kayıtlar</b>
                  <p>
                    Kötüye kullanımı önlemek için IP adresine dayalı istek sayısı geçici olarak
                    tutulur. Sitede reklam/izleme çerezi kullanılmaz.
                  </p>
                </div>
              </div>
            </div>

            <h2>İşleme amacı ve hukuki dayanak</h2>
            <p>
              Veriler; danışmanlık hizmetinin sunulması, hesaplamaların yapılması, hizmet
              kalitesinin denetlenmesi ve talebiniz hâlinde sizinle iletişim kurulması amacıyla,
              KVKK md. 5/2-c (sözleşmenin ifası) ve md. 5/2-f (meşru menfaat) kapsamında işlenir.
              Sohbet ve fatura içerikleri, cevap üretimi için yapay zekâ hizmet sağlayıcısına
              (Anthropic) iletilir; sağlayıcı bu verileri model eğitiminde kullanmaz.
            </p>

            <h2>Saklama ve silme</h2>
            <p>
              Danışmanlık talepleri, talebiniz sonuçlandıktan sonra en geç 12 ay içinde silinir.
              Sohbet kayıtları kalite denetimi amacıyla en fazla 12 ay saklanır. Verilerinizin
              silinmesini istediğinizde aşağıdaki adrese yazmanız yeterlidir.
            </p>

            <h2>Haklarınız</h2>
            <p>
              KVKK md. 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini
              veya silinmesini isteme, işlemeye itiraz etme ve zararın giderilmesini talep etme
              hakkına sahipsiniz. Başvurularınız için:{" "}
              <a href="mailto:iletisim@gesdanismani.com">iletisim@gesdanismani.com</a>
            </p>

            <p className="roi-note" style={{ maxWidth: "76ch" }}>
              Bu metin bilgilendirme amaçlıdır ve platform geliştikçe güncellenir; önemli
              değişiklikler bu sayfada duyurulur.
            </p>
          </div>
        </article>
      </main>
      <SiteFoot yol="/gizlilik" />
    </div>
  );
}
