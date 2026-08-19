import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function KategoriSecScreen() {
  const { odaTipi } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kategori Seç</Text>
      <Text>Seçilen oda: {odaTipi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});