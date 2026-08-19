import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { AppColors } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';

type Secenek = { ad: string; emoji: string };
type Kategori = { baslik: string; secenekler: Secenek[] };

const odaKategorileri: Record<string, Kategori[]> = {
  oturma: [
    { baslik: 'Koltuk Tipi', secenekler: [
      { ad: 'L Koltuk', emoji: '🛋️' }, { ad: 'Düz Koltuk', emoji: '🛋️' }, { ad: 'Berjer', emoji: '🪑' },
    ]},
    { baslik: 'Sehpa Tipi', secenekler: [
      { ad: 'Cam Sehpa', emoji: '🔷' }, { ad: 'Ahşap Sehpa', emoji: '🪵' }, { ad: 'Metal Sehpa', emoji: '⚙️' },
    ]},
    { baslik: 'Halı', secenekler: [
      { ad: 'Desenli', emoji: '🟫' }, { ad: 'Düz Renk', emoji: '⬜' }, { ad: 'Halı Yok', emoji: '🚫' },
    ]},
    { baslik: 'Aydınlatma', secenekler: [
      { ad: 'Avize', emoji: '💡' }, { ad: 'Spot', emoji: '🔦' }, { ad: 'Ayaklı Lamba', emoji: '🪔' },
    ]},
    { baslik: 'Medya Ünitesi', secenekler: [
      { ad: 'TV Ünitesi', emoji: '📺' }, { ad: 'Şömine', emoji: '🔥' }, { ad: 'Açık Raf', emoji: '📚' },
    ]},
    { baslik: 'Perde', secenekler: [
      { ad: 'Stor Perde', emoji: '🪟' }, { ad: 'Tül', emoji: '🤍' }, { ad: 'Blackout', emoji: '⬛' }, { ad: 'Perde Yok', emoji: '🚫' },
    ]},
  ],
  yatak: [
    { baslik: 'Yatak Tipi', secenekler: [
      { ad: 'Tek Kişilik', emoji: '🛏️' }, { ad: 'Çift Kişilik', emoji: '🛏️' }, { ad: 'Baza', emoji: '🛏️' },
    ]},
    { baslik: 'Dolap', secenekler: [
      { ad: 'Gardolap', emoji: '🚪' }, { ad: 'Vestiyer', emoji: '👔' }, { ad: 'Açık Raf', emoji: '📚' },
    ]},
    { baslik: 'Aydınlatma', secenekler: [
      { ad: 'Avize', emoji: '💡' }, { ad: 'Spot', emoji: '🔦' }, { ad: 'Başucu Lambası', emoji: '🪔' },
    ]},
    { baslik: 'Perde', secenekler: [
      { ad: 'Stor Perde', emoji: '🪟' }, { ad: 'Tül', emoji: '🤍' }, { ad: 'Blackout', emoji: '⬛' },
    ]},
    { baslik: 'Çalışma Köşesi', secenekler: [
      { ad: 'Var', emoji: '✅' }, { ad: 'Yok', emoji: '🚫' },
    ]},
  ],
  mutfak: [
    { baslik: 'Dolap Tipi', secenekler: [
      { ad: 'Modern', emoji: '🍽️' }, { ad: 'Klasik', emoji: '🏛️' }, { ad: 'Ahşap', emoji: '🪵' },
    ]},
    { baslik: 'Tezgah', secenekler: [
      { ad: 'Granit', emoji: '⬛' }, { ad: 'Mermer', emoji: '⬜' }, { ad: 'Ahşap', emoji: '🪵' },
    ]},
    { baslik: 'Ada', secenekler: [
      { ad: 'Var', emoji: '✅' }, { ad: 'Yok', emoji: '🚫' },
    ]},
    { baslik: 'Beyaz Eşya Rengi', secenekler: [
      { ad: 'Inox', emoji: '⚙️' }, { ad: 'Siyah', emoji: '⬛' }, { ad: 'Beyaz', emoji: '⬜' },
    ]},
  ],
  banyo: [
    { baslik: 'Lavabo', secenekler: [
      { ad: 'Gömme', emoji: '🚰' }, { ad: 'Çanak Lavabo', emoji: '🥣' },
    ]},
    { baslik: 'Duş/Küvet', secenekler: [
      { ad: 'Duşakabin', emoji: '🚿' }, { ad: 'Küvet', emoji: '🛁' },
    ]},
    { baslik: 'Zemin', secenekler: [
      { ad: 'Fayans', emoji: '🔲' }, { ad: 'Mermer Görünümlü', emoji: '⬜' }, { ad: 'Mozaik', emoji: '🟦' },
    ]},
  ],
  cocuk: [
    { baslik: 'Yatak Tipi', secenekler: [
      { ad: 'Ranza', emoji: '🛏️' }, { ad: 'Tek Yatak', emoji: '🛏️' },
    ]},
    { baslik: 'Çalışma Masası', secenekler: [
      { ad: 'Var', emoji: '✅' }, { ad: 'Yok', emoji: '🚫' },
    ]},
    { baslik: 'Tema', secenekler: [
      { ad: 'Uzay', emoji: '🚀' }, { ad: 'Prenses', emoji: '👑' }, { ad: 'Spor', emoji: '⚽' }, { ad: 'Hayvanlar', emoji: '🦁' }, { ad: 'Nötr', emoji: '🎨' },
    ]},
  ],
  calisma: [
    { baslik: 'Masa Tipi', secenekler: [
      { ad: 'L Masa', emoji: '🖥️' }, { ad: 'Düz Masa', emoji: '🖥️' },
    ]},
    { baslik: 'Depolama', secenekler: [
      { ad: 'Kitaplık', emoji: '📚' }, { ad: 'Dolap', emoji: '🚪' }, { ad: 'Açık Raf', emoji: '📚' },
    ]},
    { baslik: 'Sandalye', secenekler: [
      { ad: 'Ofis Koltuğu', emoji: '🪑' }, { ad: 'Ergonomik Koltuk', emoji: '🪑' }, { ad: 'Sade Sandalye', emoji: '🪑' },
    ]},
  ],
  oyun: [
    { baslik: 'Oyun Sistemi', secenekler: [
      { ad: 'PS Seti', emoji: '🎮' }, { ad: 'Gaming PC', emoji: '🖥️' }, { ad: 'Xbox Seti', emoji: '🎮' }, { ad: 'Retro Konsol Köşesi', emoji: '👾' },
    ]},
    { baslik: 'Koltuk', secenekler: [
      { ad: 'Gaming Koltuk', emoji: '🪑' }, { ad: 'Bean Bag', emoji: '🛋️' }, { ad: 'L Koltuk', emoji: '🛋️' }, { ad: 'Kanepe', emoji: '🛋️' },
    ]},
    { baslik: 'Ekran', secenekler: [
      { ad: 'Projeksiyon', emoji: '📽️' }, { ad: 'Büyük TV', emoji: '📺' }, { ad: 'Çift Monitör Setup', emoji: '🖥️' },
    ]},
    { baslik: 'Aydınlatma', secenekler: [
      { ad: 'RGB/LED Işık', emoji: '🌈' }, { ad: 'Neon Tabela', emoji: '💡' }, { ad: 'Sade Spot', emoji: '🔦' },
    ]},
    { baslik: 'Ekstra', secenekler: [
      { ad: 'Bilardo/Langırt Masası', emoji: '🎱' }, { ad: 'Mini Bar', emoji: '🍹' }, { ad: 'Poster Duvarı', emoji: '🖼️' }, { ad: 'Yok', emoji: '🚫' },
    ]},
  ],
};

export default function KategoriSecScreen() {
  const { odaTipi } = useLocalSearchParams<{ odaTipi: string }>();
  const kategoriler = odaKategorileri[odaTipi] || [];
  const [secimler, setSecimler] = useState<Record<string, string>>({});
  const [acikIndex, setAcikIndex] = useState<number>(0);

  const secimYap = (baslik: string, secenek: string, index: number) => {
    setSecimler((prev) => ({ ...prev, [baslik]: secenek }));
    const sonrakiAcikOlmayan = kategoriler.findIndex(
      (k, i) => i > index && !secimler[k.baslik]
    );
    setAcikIndex(sonrakiAcikOlmayan !== -1 ? sonrakiAcikOlmayan : -1);
  };

  const devamEt = () => {
    router.push({
      pathname: '/oda-boyutu' as any,
      params: { odaTipi, secimler: JSON.stringify(secimler) },
    });
  };

  const tumuSecildiMi = kategoriler.every((k) => secimler[k.baslik]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar step={2} total={4} />
      <Text style={styles.title}>Detayları Seç</Text>

      {kategoriler.map((kategori, index) => {
        const acik = acikIndex === index;
        const secili = secimler[kategori.baslik];

        return (
          <View key={kategori.baslik} style={styles.kategoriBlok}>
            <Pressable
              style={styles.kategoriHeader}
              onPress={() => setAcikIndex(acik ? -1 : index)}
            >
              <Text style={styles.kategoriBaslik}>
                {secili ? '✅ ' : ''}{kategori.baslik}
              </Text>
              <Text style={styles.kategoriDeger}>
                {secili ? secili : (acik ? '▲' : '▼')}
              </Text>
            </Pressable>

            {acik && (
              <View style={styles.secenekGrid}>
                {kategori.secenekler.map((secenek) => (
                  <Pressable
                    key={secenek.ad}
                    style={[
                      styles.secenekKart,
                      secili === secenek.ad && styles.secenekKartAktif,
                    ]}
                    onPress={() => secimYap(kategori.baslik, secenek.ad, index)}
                  >
                    <Text style={styles.secenekEmoji}>{secenek.emoji}</Text>
                    <Text
                      style={[
                        styles.secenekText,
                        secili === secenek.ad && styles.secenekTextAktif,
                      ]}
                    >
                      {secenek.ad}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        );
      })}

      <Pressable
        style={[styles.devamButon, !tumuSecildiMi && styles.devamButonPasif]}
        onPress={devamEt}
        disabled={!tumuSecildiMi}
      >
        <Text style={styles.devamButonText}>Devam Et</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 14, paddingBottom: 60, backgroundColor: AppColors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: AppColors.textPrimary },
  kategoriBlok: {
    backgroundColor: AppColors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    overflow: 'hidden',
  },
  kategoriHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  kategoriBaslik: { fontSize: 16, fontWeight: '600', color: AppColors.textPrimary },
  kategoriDeger: { fontSize: 14, color: AppColors.accent, fontWeight: '600' },
  secenekGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 16,
    paddingTop: 0,
  },
  secenekKart: {
    width: '47%',
    backgroundColor: AppColors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  secenekKartAktif: {
    backgroundColor: AppColors.accent,
    borderColor: AppColors.accent,
  },
  secenekEmoji: { fontSize: 26 },
  secenekText: { fontSize: 13, color: AppColors.textPrimary, fontWeight: '500', textAlign: 'center' },
  secenekTextAktif: { color: AppColors.accentText, fontWeight: '700' },
  devamButon: {
    backgroundColor: AppColors.accent,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  devamButonPasif: {
    backgroundColor: AppColors.disabled,
  },
  devamButonText: { color: AppColors.accentText, fontSize: 16, fontWeight: '700' },
});