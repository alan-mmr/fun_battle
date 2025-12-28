import { useState, useEffect } from 'react'
import './App.css'

// --- INTEGRASI DATA ASLI (REAL DATA) ---
// Mengambil karakter dari src/data/characters/index.js
import { CHARACTERS } from './data/characters'; 

// Mengambil helper skill dari src/data/skills/index.js
import { getSkillById } from './data/skills';

function App() {
  const [currentScreen, setCurrentScreen] = useState('MENU');
  
  // Data Seleksi
  const [selectedChar, setSelectedChar] = useState(null);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedMap, setSelectedMap] = useState(null);

  // Data Battle Real-time
  const [playerHP, setPlayerHP] = useState(0);
  const [playerMaxHP, setPlayerMaxHP] = useState(0); // Tambahan Max HP biar bar akurat
  const [playerEP, setPlayerEP] = useState(0);
  const [playerMaxEP, setPlayerMaxEP] = useState(0);
  
  const [enemyHP, setEnemyHP] = useState(0);
  const [enemyMaxHP, setEnemyMaxHP] = useState(0);

  // State UI Battle
  const [battleMenu, setBattleMenu] = useState('MAIN'); // MAIN, SKILLS, LOG
  const [battleLog, setBattleLog] = useState("");
  
  // State untuk menyimpan List Skill Asli (Object) milik Player
  const [playerSkills, setPlayerSkills] = useState([]);

  // --- MAP DATABASE (Masih Hardcoded dulu karena belum ada file map) ---
  const battlefields = [
    { id: 'SHIBUYA', name: 'Shibuya', icon: '🏙️' },
    { id: 'SHINJUKU', name: 'Shinjuku', icon: '🏢' },
    { id: 'DOMAIN', name: 'Infinite Void', icon: '🌌' }
  ];

  // --- LOGIC HELPER ---

  const handleNavigation = (screen) => setCurrentScreen(screen);

  // Logic pilih Hero
  const handleSelectChar = (char) => { 
    setSelectedChar(char); 
    handleNavigation('ENEMY_SELECT'); 
  };
  
  // Logic pilih Musuh
  const handleSelectEnemy = (enemy) => { 
    setSelectedEnemy(enemy); 
    handleNavigation('BATTLEFIELD_SELECT'); 
  };
  
  // Logic pilih Map -> Persiapan Masuk Arena
  const handleSelectMap = (map) => { 
    setSelectedMap(map); 
    initializeBattle(selectedChar, selectedEnemy);
    handleNavigation('ARENA'); 
  };

  // FUNGSI INISIALISASI BATTLE (Penting!)
  // Memindahkan stat dari Data Asli ke State Battle
  const initializeBattle = (pChar, eChar) => {
    // 1. Set Stat Player
    setPlayerHP(pChar.stats.hp);
    setPlayerMaxHP(pChar.stats.maxHp);
    setPlayerEP(pChar.stats.ep);
    setPlayerMaxEP(pChar.stats.maxEp);

    // 2. Set Stat Enemy
    setEnemyHP(eChar.stats.hp);
    setEnemyMaxHP(eChar.stats.maxHp);

    // 3. Load Skill Player (Convert ID -> Object Skill Asli)
    // Kita map skillSet (array string ID) jadi array object lengkap pake getSkillById
    const loadedSkills = pChar.skillSet.map(skillId => {
      const skillObj = getSkillById(skillId);
      return skillObj ? skillObj : { name: 'Unknown', id: 'err', cost: 0 }; // Error handling
    });
    setPlayerSkills(loadedSkills);

    // 4. Reset UI
    setBattleMenu('MAIN');
    setBattleLog("");
  };

  const pushLog = (text, delay = 1500) => {
    setBattleMenu('LOG');
    setBattleLog(text);
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  // --- BATTLE SIMULATION LOGIC (Updated with Real Data) ---
  
  const handleSkillUse = async (skill) => {
    
    // 1. Cek Cukup EP gak?
    if (playerEP < skill.cost) {
      alert("Not enough EP!"); // Nanti ganti UI bagusan
      return;
    }

    // Kurangi EP Player
    setPlayerEP(prev => prev - skill.cost);

    // --- PLAYER TURN ---
    await pushLog(`${selectedChar.name} used ${skill.name}!`);
    
    // Hitung Damage (Sederhana dulu: Power Skill - Defense Musuh/10)
    // Nanti kita ganti pake BattleEngine.js yang kompleks
    const rawDamage = skill.power || 10; 
    const defenseFactor = selectedEnemy.stats.def ? selectedEnemy.stats.def / 10 : 0;
    const finalDamage = Math.max(10, Math.floor(rawDamage - (defenseFactor * 0.1))); // Rumus ngasal dulu biar gak 0

    setEnemyHP(prev => Math.max(0, prev - finalDamage));
    await pushLog(`It hit! ${selectedEnemy.name} took ${finalDamage} damage.`);

    if (enemyHP - finalDamage <= 0) {
      await pushLog(`${selectedEnemy.name} defeated! WIN!`);
      handleNavigation('MENU');
      return;
    }

    // --- ENEMY TURN (Simple AI) ---
    await pushLog(`${selectedEnemy.name} is attacking!`);
    
    // Musuh pake skill random (disederhanakan dulu)
    const enemyDmg = selectedEnemy.stats.atk ? Math.floor(selectedEnemy.stats.atk / 2) : 20;
    
    setPlayerHP(prev => Math.max(0, prev - enemyDmg));
    await pushLog(`${selectedEnemy.name} attacked! You took ${enemyDmg} DMG.`);

    if (playerHP - enemyDmg <= 0) {
      await pushLog(`${selectedChar.name} collapsed... DEFEAT.`);
      handleNavigation('MENU');
      return;
    }

    setBattleMenu('MAIN');
  };

  const handleCharge = async () => {
    await pushLog(`${selectedChar.name} is charging energy...`);
    setPlayerEP(prev => Math.min(playerMaxEP, prev + 50)); // Charge +50
    await pushLog(`Energy surged! (+50 EP)`);
    
    // Enemy Attack Free Hit
    await pushLog(`${selectedEnemy.name} attacks while you charge!`);
    const enemyDmg = 15;
    setPlayerHP(prev => Math.max(0, prev - enemyDmg));
    setBattleMenu('MAIN');
  };

  // --- RENDER UI ---

  // Screen 1: Character Select
  if (currentScreen === 'CHARACTER_SELECT') {
    return (
      <div className="main-container">
        <h1>CHOOSE YOUR FIGHTER</h1>
        <div className="selection-grid">
          {CHARACTERS.map((c) => (
            <div key={c.id} className="selection-card" onClick={() => handleSelectChar(c)}>
              <div className="emoji-icon">{c.avatar}</div>
              <h3>{c.name}</h3>
            </div>
          ))}
        </div>
        <button className="btn-action" onClick={() => handleNavigation('MENU')}>CANCEL</button>
      </div>
    );
  }

  // Screen 2: Enemy Select
  if (currentScreen === 'ENEMY_SELECT') {
     const enemies = CHARACTERS.filter(c => c.id !== selectedChar.id);
     return (
       <div className="main-container">
         <h1>CHOOSE OPPONENT</h1>
         <div className="selection-grid">
           {enemies.map((e) => (
             <div key={e.id} className="selection-card" style={{borderColor:'#8b0000'}} onClick={() => handleSelectEnemy(e)}>
               <div className="emoji-icon">{e.avatar}</div>
               <h3>{e.name}</h3>
             </div>
           ))}
         </div>
         <button className="btn-action" onClick={() => handleNavigation('CHARACTER_SELECT')}>BACK</button>
       </div>
     );
  }

  // Screen 3: Map Select
  if (currentScreen === 'BATTLEFIELD_SELECT') {
     return (
       <div className="main-container">
         <h1>SELECT BATTLEFIELD</h1>
         <div className="selection-grid">
           {battlefields.map((m) => (
             <div key={m.id} className="selection-card" onClick={() => handleSelectMap(m)}>
               <div className="emoji-icon">{m.icon}</div>
               <h3>{m.name}</h3>
             </div>
           ))}
         </div>
         <button className="btn-action" onClick={() => handleNavigation('ENEMY_SELECT')}>BACK</button>
       </div>
     );
  }

  // Screen 4: ARENA (Main Battle)
  if (currentScreen === 'ARENA') {
    return (
      <div className="battle-container">
        <div className="battle-stage">
          {/* Enemy HUD */}
          <div className="enemy-zone">
            <div className="enemy-hud">
              <h3>{selectedEnemy?.name}</h3>
              <div className="stat-row">
                <div className="bar-container">
                  <div className="hp-fill" style={{width: `${(enemyHP / enemyMaxHP) * 100}%`}}></div>
                </div>
                <span className="stat-text">HP: {enemyHP}/{enemyMaxHP}</span>
              </div>
            </div>
            <div className="enemy-sprite">{selectedEnemy?.avatar}</div>
          </div>

          {/* Player HUD */}
          <div className="player-zone">
            <div className="player-sprite">{selectedChar?.avatar}</div>
            <div className="player-hud">
              <h3>{selectedChar?.name}</h3>
              {/* HP Bar */}
              <div className="stat-row">
                <div className="bar-container">
                  <div className="hp-fill" style={{width: `${(playerHP / playerMaxHP) * 100}%`}}></div>
                </div>
                <span className="stat-text">HP: {playerHP}/{playerMaxHP}</span>
              </div>
              {/* EP Bar */}
              <div className="stat-row">
                <div className="bar-container" style={{borderColor:'#2980b9'}}>
                  <div className="ep-fill" style={{width: `${(playerEP / playerMaxEP) * 100}%`}}></div>
                </div>
                <span className="stat-text" style={{color:'#3498db'}}>EP: {playerEP}/{playerMaxEP}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          {/* MODE LOG */}
          {battleMenu === 'LOG' && (
            <div className="battle-log-box">
              <span className="typing-effect">{battleLog}</span>
            </div>
          )}

          {/* MODE MAIN MENU */}
          {battleMenu === 'MAIN' && (
            <div className="main-actions">
              <button className="btn-battle btn-action-main" onClick={() => setBattleMenu('SKILLS')}>⚔️ ACTION</button>
              <button className="btn-battle btn-charge" onClick={handleCharge}>⚡ CHARGE</button>
              <button className="btn-battle btn-forfeit" onClick={() => handleNavigation('MENU')}>🏳️ FORFEIT</button>
            </div>
          )}

          {/* MODE SKILL GRID (DINAMIS DARI DATA) */}
          {battleMenu === 'SKILLS' && (
            <div className="skill-grid">
              {playerSkills.map((skill, index) => (
                <button 
                  key={index} 
                  className="btn-skill" 
                  onClick={() => handleSkillUse(skill)}
                  title={skill.description} // Hover buat liat deskripsi
                >
                  {skill.name} <span style={{fontSize:'0.8em', color:'#aaa'}}>({skill.cost} EP)</span>
                </button>
              ))}
              <button className="btn-skill" style={{background:'#555'}} onClick={() => setBattleMenu('MAIN')}>⬅️ BACK</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback / Other Screens
  if (currentScreen === 'SETTINGS' || currentScreen === 'DEV_HELP') return <div className="main-container"><h1>{currentScreen}</h1><button className="btn-action" onClick={()=>handleNavigation('MENU')}>BACK</button></div>;

  return (
    <div className="main-container">
      <h1 className="title">FUN BATTLE</h1>
      <p className="subtitle">Mahoraga Sandbox Ver. 1.0</p>
      <div className="menu-options">
        <button className="btn-action" onClick={() => handleNavigation('CHARACTER_SELECT')}>ENTER ARENA</button>
        <button className="btn-action" onClick={() => handleNavigation('SETTINGS')}>SETTINGS</button>
        <button className="btn-action" onClick={() => handleNavigation('DEV_HELP')}>DEV HELP</button>
      </div>
    </div>
  )
}

export default App