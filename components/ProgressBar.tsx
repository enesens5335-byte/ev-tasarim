import { View, Text, StyleSheet } from 'react-native';
import { AppColors } from '../constants/theme';

export default function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Adım {step}/{total}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${(step / total) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, gap: 6 },
  label: { fontSize: 13, color: AppColors.textSecondary, fontWeight: '600' },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.card,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: AppColors.accent,
    borderRadius: 3,
  },
});