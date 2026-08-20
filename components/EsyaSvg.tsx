import Svg, { Rect, Circle, Line, Path } from 'react-native-svg';
import { AppColors } from '../constants/theme';

export default function EsyaSvg({ ad, boyut = 60 }: { ad: string; boyut?: number }) {
  const s = boyut;
  const stroke = AppColors.accent;
  const fill = AppColors.background;

  if (ad.includes('Buzdolabı') || ad === 'Inox' || ad === 'Siyah' || ad === 'Beyaz') {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="8" y="4" width="44" height="52" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
        <Line x1="8" y1="24" x2="52" y2="24" stroke={stroke} strokeWidth="1.5" />
      </Svg>
    );
  }
  if (ad.includes('Ocak') || ad.includes('Tezgah') || ad.includes('Modern') || ad.includes('Klasik') || ad.includes('Ahşap') || ad === 'Granit' || ad === 'Mermer') {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="4" y="16" width="52" height="30" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
        <Circle cx="18" cy="26" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
        <Circle cx="42" cy="26" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
        <Circle cx="18" cy="38" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
        <Circle cx="42" cy="38" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
      </Svg>
    );
  }
  if (ad.includes('Lavabo') || ad.includes('Gömme') || ad.includes('Çanak')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="6" y="18" width="48" height="26" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
        <Circle cx="30" cy="31" r="9" fill="none" stroke={stroke} strokeWidth="1.5" />
        <Circle cx="30" cy="31" r="2" fill={stroke} />
      </Svg>
    );
  }
  if (ad === 'Ada') {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="10" y="20" width="40" height="22" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Koltuk') && !ad.includes('Ofis') && !ad.includes('Ergonomik')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="6" y="14" width="10" height="34" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
        <Rect x="44" y="14" width="10" height="34" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
        <Rect x="14" y="10" width="32" height="14" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
        <Rect x="14" y="24" width="32" height="24" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Kanepe') || ad === 'Bean Bag') {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="6" y="20" width="48" height="26" rx="10" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Berjer') || ad.includes('Sandalye') || ad.includes('Ofis') || ad.includes('Ergonomik')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Circle cx="30" cy="30" r="20" fill={fill} stroke={stroke} strokeWidth="2" />
        <Circle cx="30" cy="30" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      </Svg>
    );
  }
  if (ad.includes('Sehpa')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="12" y="18" width="36" height="24" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Yatak') || ad.includes('Baza') || ad === 'Tek Kişilik' || ad === 'Çift Kişilik') {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="8" y="4" width="44" height="52" rx="5" fill={fill} stroke={stroke} strokeWidth="2" />
        <Rect x="12" y="8" width="16" height="12" rx="3" fill="none" stroke={stroke} strokeWidth="1.5" />
        <Rect x="32" y="8" width="16" height="12" rx="3" fill="none" stroke={stroke} strokeWidth="1.5" />
      </Svg>
    );
  }
  if (ad.includes('Ranza')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="8" y="4" width="44" height="24" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
        <Rect x="8" y="32" width="44" height="24" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Dolap') || ad.includes('Gardolap') || ad.includes('Vestiyer')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="6" y="4" width="48" height="52" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
        <Line x1="30" y1="4" x2="30" y2="56" stroke={stroke} strokeWidth="1.5" />
      </Svg>
    );
  }
  if (ad.includes('Raf') || ad.includes('Kitaplık')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="6" y="6" width="48" height="48" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
        <Line x1="6" y1="22" x2="54" y2="22" stroke={stroke} strokeWidth="1.5" />
        <Line x1="6" y1="38" x2="54" y2="38" stroke={stroke} strokeWidth="1.5" />
      </Svg>
    );
  }
  if (ad.includes('TV') || ad.includes('Ekran') || ad.includes('Monitör') || ad.includes('Projeksiyon')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="4" y="18" width="52" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Masa')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="6" y="10" width="48" height="30" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Küvet')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="4" y="14" width="52" height="32" rx="16" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Duşakabin')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="8" y="8" width="44" height="44" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
        <Circle cx="30" cy="30" r="3" fill={stroke} />
      </Svg>
    );
  }
  if (ad.includes('Şömine')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="10" y="10" width="40" height="40" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
        <Path d="M30 20 C 24 30, 36 32, 30 42" fill="none" stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Avize') || ad.includes('Spot') || ad.includes('Lamba') || ad.includes('Işık') || ad.includes('Neon')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Circle cx="30" cy="30" r="16" fill="none" stroke={stroke} strokeWidth="2" />
        <Circle cx="30" cy="30" r="5" fill={stroke} />
      </Svg>
    );
  }
  if (ad.includes('Bilardo') || ad.includes('Langırt')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="4" y="14" width="52" height="32" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
        <Circle cx="4" cy="14" r="3" fill={stroke} />
        <Circle cx="56" cy="14" r="3" fill={stroke} />
        <Circle cx="4" cy="46" r="3" fill={stroke} />
        <Circle cx="56" cy="46" r="3" fill={stroke} />
      </Svg>
    );
  }
  if (ad.includes('Bar')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="6" y="20" width="48" height="14" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  if (ad.includes('Poster')) {
    return (
      <Svg width={s} height={s} viewBox="0 0 60 60">
        <Rect x="14" y="10" width="32" height="40" rx="2" fill={fill} stroke={stroke} strokeWidth="2" />
      </Svg>
    );
  }
  // varsayılan kutu
  return (
    <Svg width={s} height={s} viewBox="0 0 60 60">
      <Rect x="8" y="8" width="44" height="44" rx="4" fill={fill} stroke={stroke} strokeWidth="2" />
    </Svg>
  );
}