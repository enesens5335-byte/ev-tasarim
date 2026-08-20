import { View, Text, StyleSheet, PanResponder, Animated, Pressable, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import Svg, { Rect, Line } from 'react-native-svg';
import { AppColors } from '../constants/theme';
import EsyaSvg from '../components/EsyaSvg';

const ESYA_GENISLIK = 66;
const ESYA_YUKSEKLIK = 66;
const MAX_OLCEK = 70;
const DUVAR_KALINLIK = 8;

type YerlesikEsya = {
  id: string;
  ad: string;
  x: number;
  y: number;
  aci: number;
};

export default function OdaPlanlayiciScreen() {
  const { en, boy, secimler } = useLocalSearchParams<{ en: string; boy: string; secimler: string }>();
  const secimObj: Record<string, string> = secimler ? JSON.parse(secimler) : {};

  const ekranGenislik = Math.min(Dimensions.get('window').width - 40, 500);
  const enSayi = parseFloat((en || '').replace(',', '.')) || 4;
  const boySayi = parseFloat((boy || '').replace(',', '.')) || 4;

  const olcekGenislik = ekranGenislik / enSayi;
  const olcek = Math.min(olcekGenislik, MAX_OLCEK);

  const odaGenislikPx = enSayi * olcek;
  const odaYukseklikPx = boySayi * olcek;

  const kolonSayisi = Math.max(1, Math.floor((odaGenislikPx - DUVAR_KALINLIK * 2) / (ESYA_GENISLIK + 12)));

  const baslangicEsyalar: YerlesikEsya[] = Object.values(secimObj).map((ad, index) => {
    const satir = Math.floor(index / kolonSayisi);
    const kolon = index % kolonSayisi;
    return {
      id: `${ad}-${index}`,
      ad,
      x: DUVAR_KALINLIK + 6 + kolon * (ESYA_GENISLIK + 10),
      y: DUVAR_KALINLIK + 6 + satir * (ESYA_YUKSEKLIK + 10),
      aci: 0,
    };
  });

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

      <View style={[styles.odaDis, { width: odaGenislikPx, height: odaYukseklikPx }]}>
        <Svg width={odaGenislikPx} height={odaYukseklikPx} style={StyleSheet.absoluteFill}>
          <Rect
            x={0} y={0}
            width={odaGenislikPx} height={odaYukseklikPx}
            fill={AppColors.card}
          />
          <Rect
            x={DUVAR_KALINLIK / 2} y={DUVAR_KALINLIK / 2}
            width={odaGenislikPx - DUVAR_KALINLIK} height={odaYukseklikPx - DUVAR_KALINLIK}
            fill="none"
            stroke={AppColors.textPrimary}
            strokeWidth={DUVAR_KALINLIK}
          />
          <Line
            x1={odaGenislikPx * 0.35} y1={odaYukseklikPx}
            x2={odaGenislikPx * 0.55} y2={odaYukseklikPx}
            stroke={AppColors.card}
            strokeWidth={DUVAR_KALINLIK + 2}
          />
        </Svg>

        {esyalar.map((esya) => (
          <EsyaKutusu
            key={esya.id}
            esya={esya}
            odaGenislikPx={odaGenislikPx}
            odaYukseklikPx={odaYukseklikPx}
            onDonder={() => donder(esya.id)}
          />
        ))}
      </View>

      <Text style={styles.kapiNotu}>▭ alttaki boşluk kapı</Text>
    </View>
  );
}

function EsyaKutusu({
  esya,
  odaGenislikPx,
  odaYukseklikPx,
  onDonder,
}: {
  esya: YerlesikEsya;
  odaGenislikPx: number;
  odaYukseklikPx: number;
  onDonder: () => void;
}) {
  const konum = useRef({ x: esya.x, y: esya.y }).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const sinirla = (x: number, y: number) => {
    const minX = DUVAR_KALINLIK;
    const minY = DUVAR_KALINLIK;
    const maxX = Math.max(minX, odaGenislikPx - ESYA_GENISLIK - DUVAR_KALINLIK);
    const maxY = Math.max(minY, odaYukseklikPx - ESYA_YUKSEKLIK - DUVAR_KALINLIK);
    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    };
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        const yeniX = konum.x + gesture.dx;
        const yeniY = konum.y + gesture.dy;
        const sinirli = sinirla(yeniX, yeniY);
        konum.x = sinirli.x;
        konum.y = sinirli.y;
        pan.setValue({ x: 0, y: 0 });
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.esya,
        {
          left: konum.x,
          top: konum.y,
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate: `${esya.aci}deg` },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <EsyaSvg ad={esya.ad} boyut={44} />
      <Text style={styles.esyaAd} numberOfLines={1}>{esya.ad}</Text>
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
  odaDis: {
    position: 'relative',
    overflow: 'hidden',
  },
  kapiNotu: { fontSize: 11, color: AppColors.textSecondary, marginTop: 8 },
  esya: {
    position: 'absolute',
    backgroundColor: AppColors.background,
    borderRadius: 8,
    padding: 4,
    alignItems: 'center',
    width: ESYA_GENISLIK,
  },
  esyaAd: { fontSize: 8, color: AppColors.textPrimary, textAlign: 'center', marginTop: 1 },
  donderButon: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: AppColors.accent,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donderText: { color: AppColors.accentText, fontSize: 12, fontWeight: 'bold' },
});