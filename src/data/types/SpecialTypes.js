export const SPECIAL_TYPES = {
  FORCE: 'FORCE',   // Fisik Murni
  SPIRIT: 'SPIRIT', // Jiwa
  VOID: 'VOID',     // Hampa
};

// Interaksi khusus Special Types
export const SPECIAL_WEAKNESS = {
  [SPECIAL_TYPES.FORCE]:  ['SPIRIT', 'VOID'], 
  [SPECIAL_TYPES.SPIRIT]: ['VOID'],
  [SPECIAL_TYPES.VOID]:   [], 
};