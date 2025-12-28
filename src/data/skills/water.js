import { TYPE, CATEGORY, ACTION } from './constants';

export const waterSkills = [
  {
    id: 'water_atk_1',
    name: 'Water Cutter',
    type: TYPE.WATER,
    category: CATEGORY.PHYSICAL, // Air tekanan tinggi sifatnya fisik tajam
    actionType: ACTION.ATTACK,
    power: 40,
    cost: 20,
    description: 'Tembakan air bertekanan tinggi yang memotong seperti pisau.'
  },
  {
    id: 'water_def_1',
    name: 'Aqua Ring',
    type: TYPE.WATER,
    category: CATEGORY.ENERGY,
    actionType: ACTION.DEFENSE,
    power: 35,
    cost: 20,
    description: 'Cincin air yang melindungi pengguna dan meredam serangan api.'
  }
];