export const ELEMENTAL_TYPES = {
  API: 'API',
  AIR: 'AIR',
  ANGIN: 'ANGIN',
  LISTRIK: 'LISTRIK',
  TANAH: 'TANAH',
};

// Interaksi khusus Elemental
export const ELEMENTAL_WEAKNESS = {
  [ELEMENTAL_TYPES.API]:     ['AIR', 'TANAH'],
  [ELEMENTAL_TYPES.AIR]:     ['LISTRIK', 'ANGIN'],
  [ELEMENTAL_TYPES.ANGIN]:   ['API', 'LISTRIK'],
  [ELEMENTAL_TYPES.LISTRIK]: ['TANAH', 'ANGIN'],
  [ELEMENTAL_TYPES.TANAH]:   ['AIR', 'FORCE'], // Force ambil dari string biar ga circular dependency
};