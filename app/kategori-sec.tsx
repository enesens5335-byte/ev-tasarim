import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { AppColors } from '../constants/theme';

const odaTipleri = [
  { id: 'oturma', ad: 'Oturma Odası' },
  { id: 'yatak', ad: 'Yatak Odası' },
  { id: 'mutfak', ad: 'Mutfak' },
  { id: 'banyo', ad: 'Banyo' },
  { id: 'cocuk', ad: 'Çocuk Odası' },
  { id: 'calisma', ad: 'Çalışma Odası' },
  { id: 'oyun', ad: 'Oyun Odası' },
];

const odaKategorileri: Record<string, { baslik: string; secenekler: string[] }[]> = {
  oturma: [
    { baslik: 'Koltuk Tipi', secenekler: ['L Koltuk', 'Düz Koltuk', 'Berjer'] },
    { baslik: 'Sehpa Tipi', secenekler: ['Cam Sehpa', 'Ahşap Sehpa', 'Metal Sehpa'] },
    { baslik: 'Halı', secenekler: ['Desenli', 'Düz Renk', 'Halı Yok'] },
    { baslik: 'Aydınlatma', secenekler: ['Avize', 'Spot', 'Ayaklı Lamba'] },
    { baslik: 'Medya Ünitesi', secenekler: ['TV Ünitesi', 'Şömine', 'Açık Raf'] },
    { baslik: 'Perde', secenekler: ['Stor Perde', 'Tül', 'Blackout', 'Perde Yok'] },
  ],
  yatak: [
    { baslik: 'Yatak Tipi', secenekler: ['Tek Kişilik', 'Çift Kişilik', 'Baza'] },
    { baslik: 'Dolap', secenekler: ['Gardolap', 'Vestiyer', 'Açık Raf'] },
    { baslik: 'Aydınlatma', secenekler: ['Avize', 'Spot', 'Başucu Lambası'] },
    { baslik: 'Perde', secenekler: ['Stor Perde', 'Tül', 'Blackout'] },
    { baslik: 'Çalışma Köşesi', secenekler: ['Var', 'Yok'] },
  ],
  mutfak: [
    { baslik: 'Dolap Tipi', secenekler: ['Modern', 'Klasik', 'Ahşap'] },
    { baslik: 'Tezgah', secenekler: ['Granit', 'Mermer', 'Ahşap'] },
    { baslik: 'Ada', secenekler: ['Var', 'Yok'] },
    { baslik: 'Beyaz Eşya Rengi', secenekler: ['Inox', 'Siyah', 'Beyaz'] },
  ],
  banyo: [
    { baslik: 'Lavabo', secenekler: ['Gömme', 'Çanak Lavabo'] },
    { baslik: 'Duş/Küvet', secenekler: ['Duşakabin', 'Küvet'] },
    { baslik: 'Zemin', secenekler: ['Fayans', 'Mermer Görünümlü', 'Mozaik'] },
  ],
  cocuk: [
    { baslik: 'Yatak Tipi', secenekler: ['Ranza', 'Tek Yatak'] },
    { baslik: 'Çalışma Masası', secenekler: ['Var', 'Yok'] },
    { baslik: 'Tema', secenekler: ['Uzay', 'Prenses', 'Spor', 'Hayvanlar', 'Nötr'] },
  ],
  calisma: [
    { baslik: 'Masa Tipi', secenekler: ['L Masa', 'Düz Masa'] },
    { baslik: 'Depolama', secenekler: ['Kitaplık', 'Dolap', 'Açık Raf'] },
    { baslik: 'Sandalye', secenekler: ['Ofis Koltuğu', 'Ergonomik Koltuk', 'Sade Sandalye'] },
  ],
  oyun: [
    { baslik: 'Oyun Sistemi', secenekler: ['PS Seti', 'Gaming PC', 'Xbox Seti', 'Retro Konsol Köşesi'] },
    { baslik: 'Koltuk', secenekler: ['Gaming Koltuk', 'Bean Bag', 'L Koltuk', 'Kanepe'] },
    { baslik: 'Ekran', secenekler: ['Projeksiyon', 'Büyük TV', 'Çift Monitör Setup'] },
    { baslik: 'Aydınlatma', secenekler: ['RGB/LED Işık', 'Neon Tabela', 'Sade Spot'] },
    { baslik: 'Ekstra', secenekler: ['Bilardo/Langırt Masası', 'Mini Bar', 'Poster Duvarı', 'Yok'] },
  ],
};

export default function KategoriSecScreen() {
  const { odaTipi } = useLocalSearchParams<{ odaTipi: string }>();
  const kategoriler = odaKategorileri[odaTipi] || [];
  const [secimler, setSecimler] = useState<Record<string, string>>({});

  const secimYap = (baslik: string, secenek: string) => {
    setSecimler((prev) => ({ ...prev, [baslik]: secenek }));
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
      <Text style={styles.title}>Detayları Seç</Text>

      {kategoriler.map((kategori) => (
        <View key={kategori.baslik} style={styles.kategoriBlok}>
          <Text style={styles.kategoriBaslik}>{kategori.baslik}</Text>
          <View style={styles.secenekRow}>
            {kategori.secenekler.map((secenek) => (
              <Pressable
                key={secenek}
                style={[
                  styles.secenekChip,
                  secimler[kategori.baslik] === secenek && styles.secenekChipAktif,
                ]}
                onPress={() => secimYap(kategori.baslik, secenek)}
              >
                <Text
                  style={[
                    styles.secenekText,
                    secimler[kategori.baslik] === secenek && styles.secenekTextAktif,
                  ]}
                >
                  {secenek}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}

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
  container: { padding: 20, gap: 20, paddingBottom: 60, backgroundColor: AppColors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: AppColors.textPrimary },
  kategoriBlok: { gap: 10 },
  kategoriBaslik: { fontSize: 16, fontWeight: '600', color: AppColors.textPrimary },
  secenekRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  secenekChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: AppColors.card,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  secenekChipAktif: {
    backgroundColor: AppColors.accent,
    borderColor: AppColors.accent,
  },
  secenekText: { fontSize: 14, color: AppColors.textPrimary },
  secenekTextAktif: { color: AppColors.accentText, fontWeight: '600' },
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