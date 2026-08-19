import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppColors } from '../../constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EVİNİ TASARLA</Text>

      <Text style={styles.subtitle}>
        Hayalindeki evi kendi tarzınla oluştur.
      </Text>

      <Pressable style={styles.button} onPress={() => router.push('/oda-tipi')}>
        <Text style={styles.buttonText}>Tasarıma Başla</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: AppColors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: AppColors.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: AppColors.accent,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  buttonText: {
    color: AppColors.accentText,
    fontSize: 17,
    fontWeight: '700',
  },
});