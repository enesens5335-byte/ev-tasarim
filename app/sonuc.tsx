import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { AppColors } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';

const odaAdlari: Record<string, string> = {
  oturma: 'Oturma Odası',
  yatak: 'Yatak Odası',
  mutfak: 'Mutfak',
  banyo: 'Banyo',
  cocuk: 'Çocuk Odası',
  calisma: 'Çalışma Odası',
  oyun: 'Oyun Odası',
};

export default function SonucScreen() {
  const { odaTipi, secimler, en, boy } = useLocalSearchParams<{
    odaTipi: string;
    secimler: string;
    en: string;
    boy: string;
  }>();

  const secimObj: Record<string, string> = secimler ? JSON.parse(secimler) : {};
  const odaAdi = odaAdlari[odaTipi] || odaTipi;

  const baştanBaşla = () => {
    router.push('/');
  };

  const odayiPlanla = () => {
    router.push({
      pathname: '/oda-planlayici' as any,
      params: { odaTipi, secimler, en, boy },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar step={4} total={4} />
      <Text style={styles.title}>Özet</Text>

      <View style={styles.kart}>
        <Text style={styles.kartBaslik}>Oda Tipi</Text>
        <Text style={styles.kartDeger}>{odaAdi}</Text>
      </View>

      <View style={styles.kart}>
        <Text style={styles.kartBaslik}>Boyut</Text>
        <Text style={styles.kartDeger}>{en} m x {boy} m</Text>
      </View>

      {Object.entries(secimObj).map(([baslik, deger]) => (
        <View key={baslik} style={styles.kart}>
          <Text style={styles.kartBaslik}>{baslik}</Text>
          <Text style={styles.kartDeger}>{deger}</Text>
        </View>
      ))}

      <Pressable style={styles.uretButon} onPress={odayiPlanla}>
        <Text style={styles.uretButonText}>Odayı Planla</Text>
      </Pressable>

      <Pressable style={styles.baştanButon} onPress={baştanBaşla}>
        <Text style={styles.baştanButonText}>Baştan Başla</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 14, paddingBottom: 60, backgroundColor: AppColors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: AppColors.textPrimary },
  kart: {
    backgroundColor: AppColors.card,
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  kartBaslik: { fontSize: 13, color: AppColors.textSecondary, fontWeight: '600' },
  kartDeger: { fontSize: 17, color: AppColors.textPrimary, fontWeight: '600' },
  uretButon: {
    backgroundColor: AppColors.accent,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  uretButonText: { color: AppColors.accentText, fontSize: 16, fontWeight: '700' },
  baştanButon: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.accent,
  },
  baştanButonText: { color: AppColors.accent, fontSize: 15, fontWeight: '600' },
});