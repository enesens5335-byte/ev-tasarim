import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';

const odaTipleri = [
  { id: 'oturma', ad: 'Oturma Odası' },
  { id: 'yatak', ad: 'Yatak Odası' },
  { id: 'mutfak', ad: 'Mutfak' },
  { id: 'banyo', ad: 'Banyo' },
  { id: 'cocuk', ad: 'Çocuk Odası' },
  { id: 'calisma', ad: 'Çalışma Odası' },
];

export default function OdaTipiScreen() {
  const seciminiYap = (odaId: string) => {
    router.push({ pathname: '/kategori-sec', params: { odaTipi: odaId } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Oda Tipini Seç</Text>
      {odaTipleri.map((oda) => (
        <Pressable
          key={oda.id}
          style={styles.card}
          onPress={() => seciminiYap(oda.id)}
        >
          <Text style={styles.cardText}>{oda.ad}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 12,
  },
  cardText: { fontSize: 18, fontWeight: '500' },
});