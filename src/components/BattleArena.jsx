import { useState } from 'react';

// Perhatikan props sekarang: playerData & enemyData
const BattleArena = ({ playerData, enemyData, onExit }) => {
  
  // --- BATTLE STATE ---
  const [turn, setTurn] = useState(1);
  const [menuState, setMenuState] = useState('IDLE'); 
  const [logs, setLogs] = useState(['Battle Start!', `${playerData.name} vs ${enemyData.name}`]);

  // --- HANDLERS ---
  const handleActionClick = () => {
    setMenuState('ACTION');
  };

  const handleSkillSelect = (skillName) => {
    addLog(`${playerData.name} uses ${skillName}!`); // Pakai nama dari data
    setMenuState('IDLE'); 
    setTurn(prev => prev + 1);
  };

  const addLog = (msg) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  return (
    <div className="battle-arena">
      {/* --- TOP HUD --- */}
      <div className="arena-header">
        <span>Turn: {turn}</span>
        <button className="btn-small" onClick={onExit}>Surrender</button>
      </div>

      {/* --- BATTLEFIELD --- */}
      <div className="battle-field">
        
        {/* ENEMY AREA */}
        <div className="fighter-area enemy-area">
          <div className="stat-box">
            <h3>{enemyData.name}</h3> {/* Ambil nama dari data */}
            <div className="hp-bar-container">
              <div className="hp-bar" style={{width: '100%'}}></div>
            </div>
          </div>
          <div className="sprite-box enemy-sprite">{enemyData.avatar}</div> {/* Ambil avatar */}
        </div>

        {/* PLAYER AREA */}
        <div className="fighter-area player-area">
           <div className="sprite-box player-sprite">{playerData.avatar}</div> {/* Ambil avatar */}
           <div className="stat-box">
            <h3>{playerData.name}</h3> {/* Ambil nama dari data */}
            <div className="hp-bar-container">
              <div className="hp-bar" style={{width: '100%'}}></div>
            </div>
            <div className="ep-bar-container">
              <div className="ep-bar" style={{width: '50%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTROL PANEL --- */}
      <div className="control-panel">
        {menuState === 'IDLE' ? (
          <div className="panel-idle">
            <div className="battle-logs">
              {logs.map((log, idx) => (
                <div key={idx}>{'>'} {log}</div>
              ))}
            </div>
            <button className="btn-action-main" onClick={handleActionClick}>
              ACTION
            </button>
          </div>
        ) : (
          <div className="panel-skills">
            <div className="skill-grid">
               {/* Nanti tombol ini kita ganti dengan map() skillSet asli */}
              <button onClick={() => handleSkillSelect('Attack 1')}>Atk 1</button>
              <button onClick={() => handleSkillSelect('Attack 2')}>Atk 2</button>
              <button onClick={() => handleSkillSelect('Defense')}>Def</button>
              <button onClick={() => handleSkillSelect('Special')}>Ult</button>
              <button onClick={() => handleSkillSelect('Heal')}>Heal</button>
              <button className="btn-cancel" onClick={() => setMenuState('IDLE')}>BACK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleArena;