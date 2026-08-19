import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { AppColors } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';

export default function OdaBoyutuScreen() {
  const { odaTipi, secimler } = useLocalSearchParams<{ odaTipi: string; secimler: string }>();
  const [en, setEn] = useState('');
  const [boy, setBoy] = useState('');

  const devamEt = () => {
    router.push({
      pathname: '/sonuc' as any,
      params: { odaTipi, secimler, en, boy },
    });
  };

  const gecerliMi = en.trim().length > 0 && boy.trim().length > 0;

  return (
    
// ...
<ScrollView contentContainerStyle={styles.container}>
  <ProgressBar step={3} total={4} />
  <Text style={styles.title}>Oda Boyutu</Text>
  ...
      <Text style={styles.subtitle}>Odanın en ve boy ölçülerini metre cinsinden gir.</Text>

      <View style={styles.inputBlok}>
        <Text style={styles.label}>En (metre)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Örn: 4"
          placeholderTextColor={AppColors.textSecondary}
          value={en}
          onChangeText={setEn}
        />
      </View>

      <View style={styles.inputBlok}>
        <Text style={styles.label}>Boy (metre)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Örn: 5"
          placeholderTextColor={AppColors.textSecondary}
          value={boy}
          onChangeText={setBoy}
        />
      </View>

      <Pressable
        style={[styles.devamButon, !gecerliMi && styles.devamButonPasif]}
        onPress={devamEt}
        disabled={!gecerliMi}
      >
        <Text style={styles.devamButonText}>Devam Et</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 20, paddingBottom: 60, backgroundColor: AppColors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: AppColors.textPrimary },
  subtitle: { fontSize: 14, color: AppColors.textSecondary, marginBottom: 10 },
  inputBlok: { gap: 8 },
  label: { fontSize: 16, fontWeight: '600', color: AppColors.textPrimary },
  input: {
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: AppColors.card,
    color: AppColors.textPrimary,
  },
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