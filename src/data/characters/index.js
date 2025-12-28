import { sukuna } from './sukuna';
import { gojo } from './gojo';
import { mahoraga } from './mahoraga';

// Kumpulan semua karakter
export const CHARACTERS = [
  sukuna,
  gojo,
  mahoraga
];

// Helper untuk cari karakter by ID
export const getCharacterById = (id) => CHARACTERS.find(c => c.id === id);