import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { AppColors } from '../constants/theme';
 import ProgressBar from '../components/ProgressBar';

const odaTipleri = [
  { id: 'oturma', ad: 'Oturma Odası' },
  { id: 'yatak', ad: 'Yatak Odası' },
  { id: 'mutfak', ad: 'Mutfak' },
  { id: 'banyo', ad: 'Banyo' },
  { id: 'cocuk', ad: 'Çocuk Odası' },
  { id: 'calisma', ad: 'Çalışma Odası' },
  { id: 'oyun', ad: 'Oyun Odası' }
];

export default function OdaTipiScreen() {
  const seciminiYap = (odaId: string) => {
    router.push({ pathname: '/kategori-sec' as any, params: { odaTipi: odaId } });
  };

  return (
   
// ...
<ScrollView contentContainerStyle={styles.container}>
  <ProgressBar step={1} total={4} />
  <Text style={styles.title}>Oda Tipini Seç</Text>
  ...
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
  container: { padding: 20, gap: 12, backgroundColor: AppColors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: AppColors.textPrimary },
  card: {
    backgroundColor: AppColors.card,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  cardText: { fontSize: 18, fontWeight: '500', color: AppColors.textPrimary },
});