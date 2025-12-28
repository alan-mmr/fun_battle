import { TYPE, CATEGORY, ACTION } from './constants';

export const spiritSkills = [
  {
    id: 'spirit_atk_1',
    name: 'Soul Resonance',
    type: TYPE.SPIRIT,
    category: CATEGORY.ENERGY,
    actionType: ACTION.ATTACK,
    power: 45,
    cost: 20,
    description: 'Menyerang jiwa langsung. Tembus pertahanan fisik (Force).'
  },
  {
    id: 'spirit_def_1',
    name: 'Ethereal Form',
    type: TYPE.SPIRIT,
    category: CATEGORY.PHYSICAL, // Avoids Physical
    actionType: ACTION.DEFENSE,
    power: 100, // Evasion tinggi vs Physical
    cost: 25,
    description: 'Mengubah tubuh menjadi roh untuk menembus/menghindar benda padat.'
  }
];