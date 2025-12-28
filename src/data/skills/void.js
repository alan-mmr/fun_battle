import { TYPE, CATEGORY, ACTION } from './constants';

export const voidSkills = [
  {
    id: 'void_atk_1',
    name: 'Hollow Purple',
    type: TYPE.VOID,
    category: CATEGORY.ENERGY,
    actionType: ACTION.ATTACK,
    power: 80,
    cost: 40,
    tags: ['GOLDEN_RULE'], // Tembus segala defense biasa
    description: 'Teknik masa imajiner. Menghapus materi yang disentuhnya.'
  },
  {
    id: 'void_def_1',
    name: 'Infinity Barrier',
    type: TYPE.VOID,
    category: CATEGORY.ENERGY, // Blocks Energy & Physical (Special)
    actionType: ACTION.DEFENSE,
    power: 999, // Absolute Defense
    cost: 50,
    description: 'Memanipulasi ruang agar serangan tidak pernah sampai.'
  }
];