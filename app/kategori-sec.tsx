import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';

const odaKategorileri: Record<string, { baslik: string; secenekler: string[] }[]> = {
  oturma: [
    { baslik: 'Koltuk Tipi', secenekler: ['L Koltuk', 'Düz Koltuk', 'Berjer'] },
    { baslik: 'Sehpa Tipi', secenekler: ['Cam Sehpa', 'Ahşap Sehpa', 'Metal Sehpa'] },
    { baslik: 'Halı', secenekler: ['Desenli', 'Düz Renk', 'Halı Yok'] },
    { baslik: 'Aydınlatma', secenekler: ['Avize', 'Spot', 'Ayaklı Lamba'] },
  ],
  yatak: [
    { baslik: 'Yatak Tipi', secenekler: ['Tek Kişilik', 'Çift Kişilik', 'Baza'] },
    { baslik: 'Dolap', secenekler: ['Gardolap', 'Vestiyer', 'Açık Raf'] },
    { baslik: 'Aydınlatma', secenekler: ['Avize', 'Spot', 'Başucu Lambası'] },
  ],
  mutfak: [
    { baslik: 'Dolap Tipi', secenekler: ['Modern', 'Klasik', 'Ahşap'] },
    { baslik: 'Tezgah', secenekler: ['Granit', 'Mermer', 'Ahşap'] },
  ],
  banyo: [
    { baslik: 'Lavabo', secenekler: ['Gömme', 'Çanak Lavabo'] },
    { baslik: 'Duş/Küvet', secenekler: ['Duşakabin', 'Küvet'] },
  ],
  cocuk: [
    { baslik: 'Yatak Tipi', secenekler: ['Ranza', 'Tek Yatak'] },
    { baslik: 'Çalışma Masası', secenekler: ['Var', 'Yok'] },
  ],
  calisma: [
    { baslik: 'Masa Tipi', secenekler: ['L Masa', 'Düz Masa'] },
    { baslik: 'Depolama', secenekler: ['Kitaplık', 'Dolap', 'Açık Raf'] },
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
      pathname: '/oda-boyutu',
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
  container: { padding: 20, gap: 20, paddingBottom: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  kategoriBlok: { gap: 10 },
  kategoriBaslik: { fontSize: 16, fontWeight: '600', color: '#333' },
  secenekRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  secenekChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  secenekChipAktif: {
    backgroundColor: '#222',
    borderColor: '#222',
  },
  secenekText: { fontSize: 14, color: '#333' },
  secenekTextAktif: { color: '#fff', fontWeight: '600' },
  devamButon: {
    backgroundColor: '#222',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  devamButonPasif: {
    backgroundColor: '#ccc',
  },
  devamButonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});