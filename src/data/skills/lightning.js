import { TYPE, CATEGORY, ACTION } from './constants';

export const lightningSkills = [
  {
    id: 'lightning_atk_1',
    name: 'Thunder Clap',
    type: TYPE.LIGHTNING,
    category: CATEGORY.ENERGY,
    actionType: ACTION.ATTACK,
    power: 65,
    cost: 35,
    description: 'Sambaran kilat instan. Sangat kuat lawan Air.'
  },
  {
    id: 'lightning_def_1',
    name: 'Electric Field',
    type: TYPE.LIGHTNING,
    category: CATEGORY.ENERGY,
    actionType: ACTION.DEFENSE,
    power: 25,
    cost: 20,
    description: 'Medan listrik statis yang menyengat siapa pun yang mendekat.'
  }
];