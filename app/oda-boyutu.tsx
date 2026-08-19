import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';

export default function OdaBoyutuScreen() {
  const { odaTipi, secimler } = useLocalSearchParams<{ odaTipi: string; secimler: string }>();
  const [en, setEn] = useState('');
  const [boy, setBoy] = useState('');

  const devamEt = () => {
    router.push({
      pathname: '/sonuc' ,
      params: {
        odaTipi,
        secimler,
        en,
        boy,
      },
    });
  };
  const gecerliMi = en.trim().length > 0 && boy.trim().length > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Oda Boyutu</Text>
      <Text style={styles.subtitle}>Odanın en ve boy ölçülerini metre cinsinden gir.</Text>

      <View style={styles.inputBlok}>
        <Text style={styles.label}>En (metre)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Örn: 4"
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
  container: { padding: 20, gap: 20, paddingBottom: 60 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 10 },
  inputBlok: { gap: 8 },
  label: { fontSize: 16, fontWeight: '600', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
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