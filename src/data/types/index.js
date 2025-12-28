import { SPECIAL_TYPES, SPECIAL_WEAKNESS } from './SpecialTypes';
import { ELEMENTAL_TYPES, ELEMENTAL_WEAKNESS } from './ElementalTypes';

// 1. Gabung Semua Definisi Tipe
export const TYPES = {
  ...SPECIAL_TYPES,
  ...ELEMENTAL_TYPES,
};

// 2. Gabung Semua Chart Weakness
export const WEAKNESS_CHART = {
  ...SPECIAL_WEAKNESS,
  ...ELEMENTAL_WEAKNESS,
};

// 3. Helper Function Tetap Disini (atau bisa dipisah juga kalau mau)
export const getMultiplier = (atk, def, isGolden = false) => {
    if (isGolden) return 2.0;
    if (atk === TYPES.VOID) return 2.0;
    if (def === TYPES.VOID && atk !== TYPES.VOID) return 0.0;
    
    if (WEAKNESS_CHART[def]?.includes(atk)) return 2.0; // Super Effective
    if (WEAKNESS_CHART[atk]?.includes(def)) return 0.5; // Not Effective
    
    return 1.0;
};