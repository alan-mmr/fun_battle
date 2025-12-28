import { forceSkills } from './force';
import { voidSkills } from './void';
import { spiritSkills } from './spirit';
import { fireSkills } from './fire';
import { waterSkills } from './water';
import { earthSkills } from './earth';
import { windSkills } from './wind';
import { lightningSkills } from './lightning';

// 1. Gabungkan semua skill ke dalam satu array besar
export const ALL_SKILLS = [
  ...forceSkills,
  ...voidSkills,
  ...spiritSkills,
  ...fireSkills,
  ...waterSkills,
  ...earthSkills,
  ...windSkills,
  ...lightningSkills
];

// 2. Helper Functions (Logic)

// Cari skill berdasarkan ID
export const getSkillById = (id) => ALL_SKILLS.find(s => s.id === id);

// Cari skill berdasarkan Elemen (misal: untuk filter loadout karakter)
export const getSkillsByType = (type) => ALL_SKILLS.filter(s => s.type === type);