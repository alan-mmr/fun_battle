export const sukuna = {
  id: 'sukuna',
  name: 'Ryomen Sukuna',
  role: 'King of Curses',
  stats: {
    hp: 1000,
    maxHp: 1000,
    ep: 50,
    maxEp: 500,
    atk: 100, // Attack tinggi
    def: 50
  },
  // Skill ID merujuk ke file di folder skills
  skillSet: [
    'force_atk_1', // Dismantle (Main)
    'fire_atk_1',  // Fire Arrow (Special)
    'force_def_1', // Hardened Skin
    'fire_def_1'   // Heat Haze
  ],
  avatar: '👺', 
  description: 'Specialist: API & FORCE. Playstyle: Brutal/High Damage.'
};