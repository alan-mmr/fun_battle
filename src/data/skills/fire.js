import { TYPE, CATEGORY, ACTION } from './constants';

export const fireSkills = [
  {
    id: 'fire_atk_1',
    name: 'Fire Arrow (Fuga)',
    type: TYPE.FIRE,
    category: CATEGORY.ENERGY, // Panas/Ledakan = Energy
    actionType: ACTION.ATTACK,
    power: 90, // Ultimate Sukuna, damage gede
    cost: 50,
    description: 'Panah api terkonsentrasi yang membakar target hingga hangus. (Sukuna Special)'
  },
  {
    id: 'fire_def_1',
    name: 'Heat Haze',
    type: TYPE.FIRE,
    category: CATEGORY.ENERGY,
    actionType: ACTION.DEFENSE,
    power: 20, 
    cost: 15,
    description: 'Menciptakan fatamorgana panas untuk mengaburkan pandangan musuh.'
  }
];