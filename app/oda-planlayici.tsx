import { View, Text, StyleSheet, PanResponder, Animated, Pressable, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { AppColors } from '../constants/theme';

const emojiHaritasi: Record<string, string> = {
  'PS Seti': '🎮', 'Gaming PC': '🖥️', 'Xbox Seti': '🎮', 'Retro Konsol Köşesi': '👾',
  'Gaming Koltuk': '🪑', 'Bean Bag': '🛋️', 'L Koltuk': '🛋️', 'Kanepe': '🛋️',
  'Projeksiyon': '📽️', 'Büyük TV': '📺', 'Çift Monitör Setup': '🖥️',
  'RGB/LED Işık': '🌈', 'Neon Tabela': '💡', 'Sade Spot': '🔦',
  'Bilardo/Langırt Masası': '🎱', 'Mini Bar': '🍹', 'Poster Duvarı': '🖼️',
  'Düz Koltuk': '🛋️', 'Berjer': '🪑', 'Cam Sehpa': '🔷', 'Ahşap Sehpa': '🪵', 'Metal Sehpa': '⚙️',
  'Avize': '💡', 'Spot': '🔦', 'Ayaklı Lamba': '🪔', 'TV Ünitesi': '📺', 'Şömine': '🔥',
  'Tek Kişilik': '🛏️', 'Çift Kişilik': '🛏️', 'Baza': '🛏️', 'Gardolap': '🚪', 'Vestiyer': '👔',
  'Başucu Lambası': '🪔', 'Modern': '🍽️', 'Klasik': '🏛️', 'Granit': '⬛', 'Mermer': '⬜',
  'Gömme': '🚰', 'Çanak Lavabo': '🥣', 'Duşakabin': '🚿', 'Küvet': '🛁',
  'Ranza': '🛏️', 'Ofis Koltuğu': '🪑', 'Ergonomik Koltuk': '🪑', 'Sade Sandalye': '🪑',
  'L Masa': '🖥️', 'Düz Masa': '🖥️', 'Kitaplık': '📚',
};

type YerlesikEsya = {
  id: string;
  ad: string;
  emoji: string;
  x: number;
  y: number;
  aci: number;
};

export default function OdaPlanlayiciScreen() {
  const { en, boy, secimler } = useLocalSearchParams<{ en: string; boy: string; secimler: string }>();
  const secimObj: Record<string, string> = secimler ? JSON.parse(secimler) : {};

  const ekranGenislik = Dimensions.get('window').width - 40;
  const enSayi = parseFloat(en.replace(',', '.')) || 4;
  const boySayi = parseFloat(boy.replace(',', '.')) || 4;
  const olcek = ekranGenislik / enSayi;
  const odaGenislikPx = ekranGenislik;
  const odaYukseklikPx = boySayi * olcek;

  const baslangicEsyalar: YerlesikEsya[] = Object.values(secimObj).map((ad, index) => ({
    id: `${ad}-${index}`,
    ad,
    emoji: emojiHaritasi[ad] || '📦',
    x: 30 + (index % 3) * 90,
    y: 30 + Math.floor(index / 3) * 90,
    aci: 0,
  }));

  const [esyalar, setEsyalar] = useState(baslangicEsyalar);

  const donder = (id: string) => {
    setEsyalar((prev) =>
      prev.map((e) => (e.id === id ? { ...e, aci: (e.aci + 45) % 360 } : e))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oda Planı</Text>
      <Text style={styles.subtitle}>Eşyaları sürükleyip döndür butonuyla çevirebilirsin.</Text>

      <View style={[styles.oda, { width: odaGenislikPx, height: odaYukseklikPx }]}>
        {esyalar.map((esya) => (
          <EsyaKutusu key={esya.id} esya={esya} setEsyalar={setEsyalar} onDonder={() => donder(esya.id)} />
        ))}
      </View>
    </View>
  );
}

function EsyaKutusu({
  esya,
  setEsyalar,
  onDonder,
}: {
  esya: YerlesikEsya;
  setEsyalar: React.Dispatch<React.SetStateAction<YerlesikEsya[]>>;
  onDonder: () => void;
}) {
  const pan = useRef(new Animated.ValueXY({ x: esya.x, y: esya.y })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.esya,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate: `${esya.aci}deg` },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.esyaEmoji}>{esya.emoji}</Text>
      <Text style={styles.esyaAd}>{esya.ad}</Text>
      <Pressable style={styles.donderButon} onPress={onDonder}>
        <Text style={styles.donderText}>↻</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: AppColors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 13, color: AppColors.textSecondary, marginBottom: 16 },
  oda: {
    backgroundColor: AppColors.card,
    borderWidth: 2,
    borderColor: AppColors.border,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  esya: {
    position: 'absolute',
    backgroundColor: AppColors.background,
    borderWidth: 1,
    borderColor: AppColors.accent,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    width: 80,
  },
  esyaEmoji: { fontSize: 26 },
  esyaAd: { fontSize: 10, color: AppColors.textPrimary, textAlign: 'center', marginTop: 2 },
  donderButon: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: AppColors.accent,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donderText: { color: AppColors.accentText, fontSize: 14, fontWeight: 'bold' },
});