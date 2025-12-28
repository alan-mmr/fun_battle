import { TYPE, CATEGORY, ACTION } from './constants';

export const forceSkills = [
  {
    id: 'force_atk_1',
    name: 'Dismantle Cut',
    type: TYPE.FORCE,
    category: CATEGORY.PHYSICAL, // Physical Attack
    actionType: ACTION.ATTACK,
    power: 50,
    cost: 10,
    description: 'Serangan tebasan fisik tak terlihat. Neutral damage.'
  },
  {
    id: 'force_def_1',
    name: 'Hardened Skin',
    type: TYPE.FORCE,
    category: CATEGORY.PHYSICAL, // Blocks Physical
    actionType: ACTION.DEFENSE,
    power: 30, // Mengurangi damage masuk sebesar 30
    cost: 15,
    description: 'Mengeraskan tubuh untuk menahan serangan fisik (Physical Armor).'
  }
];