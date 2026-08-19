import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';

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
    backgroundColor: '#F7F5F2',
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#222',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});