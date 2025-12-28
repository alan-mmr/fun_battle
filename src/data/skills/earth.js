import { TYPE, CATEGORY, ACTION } from './constants';

export const earthSkills = [
  {
    id: 'earth_atk_1',
    name: 'Terra Spikes',
    type: TYPE.EARTH,
    category: CATEGORY.PHYSICAL, // Batuan padat = Fisik
    actionType: ACTION.ATTACK,
    power: 55,
    cost: 25,
    description: 'Memunculkan paku tanah tajam dari bawah. Kuat lawan Listrik.'
  },
  {
    id: 'earth_def_1',
    name: 'Stone Fortress',
    type: TYPE.EARTH,
    category: CATEGORY.PHYSICAL, // Blocks Physical
    actionType: ACTION.DEFENSE,
    power: 60, // Defense fisik tinggi
    cost: 30,
    description: 'Membangun dinding batu kokoh. Sangat efektif menahan serangan fisik.'
  }
];