import { TYPE, CATEGORY, ACTION } from './constants';

export const windSkills = [
  {
    id: 'wind_atk_1',
    name: 'Vacuum Cut',
    type: TYPE.WIND,
    category: CATEGORY.ENERGY, // Tekanan udara = Energi
    actionType: ACTION.ATTACK,
    power: 45,
    cost: 20,
    description: 'Sayatan angin vakum tak terlihat. Lemah lawan Api.'
  },
  {
    id: 'wind_def_1',
    name: 'Gale Barrier',
    type: TYPE.WIND,
    category: CATEGORY.ENERGY, // Blocks Energy/Projectile
    actionType: ACTION.DEFENSE,
    power: 30,
    cost: 15,
    description: 'Pusaran angin yang membelokkan serangan proyektil/energi.'
  }
];