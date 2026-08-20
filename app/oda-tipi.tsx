import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { AppColors } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';

const odaTipleri = [
  { id: 'oturma', ad: 'Oturma Odası', emoji: '🛋️' },
  { id: 'yatak', ad: 'Yatak Odası', emoji: '🛏️' },
  { id: 'mutfak', ad: 'Mutfak', emoji: '🍳' },
  { id: 'banyo', ad: 'Banyo', emoji: '🛁' },
  { id: 'cocuk', ad: 'Çocuk Odası', emoji: '🧸' },
  { id: 'calisma', ad: 'Çalışma Odası', emoji: '💼' },
  { id: 'oyun', ad: 'Oyun Odası', emoji: '🎮' },
];

export default function OdaTipiScreen() {
  const seciminiYap = (odaId: string) => {
    router.push({ pathname: '/kategori-sec' as any, params: { odaTipi: odaId } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar step={1} total={4} />
      <Text style={styles.title}>Oda Tipini Seç</Text>
      {odaTipleri.map((oda) => (
        <Pressable
          key={oda.id}
          style={styles.card}
          onPress={() => seciminiYap(oda.id)}
        >
          <Text style={styles.cardIcon}>{oda.emoji}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardText: { fontSize: 18, fontWeight: '500', color: AppColors.textPrimary },
});