document.addEventListener('DOMContentLoaded', () => {

  // --- TABLEAU D'XP CUMULÉE PAR NIVEAU (PALADIUM V12) ---
const xpCumulativeTable = {
    1: 0,
    2: 5000,
    3: 15000,
    4: 73751,
    5: 120000,
    6: 200000,
    7: 350000,
  };

  function getXPForLevel(lvl) {
    if (xpCumulativeTable[lvl] !== undefined) return xpCumulativeTable[lvl];
    return Math.floor(1000 * Math.pow(lvl, 2.2));
  }

  // --- BASE DE DONNÉES SÉPARÉE JAVA / BEDROCK ---
  const jobDatabase = {
    java: {
      miner: `
        <optgroup label="Minerais Rares & Paladium">
          <option value="340">Minerai de Paladium Vert (340 XP)</option>
          <option value="255">Minerai de Paladium (255 XP)</option>
          <option value="110">Minerai de Findium (110 XP)</option>
          <option value="85">Minerai de Titane (85 XP)</option>
          <option value="75">Minerai d'Émeraude (75 XP)</option>
          <option value="60">Minerai d'Améthyste (60 XP)</option>
          <option value="25">Minerai de Diamant (25 XP)</option>
        </optgroup>
        <optgroup label="Cuisson au Four">
          <option value="15">Lingot de Paladium - Fondre (15 XP)</option>
          <option value="8">Lingot de Titane - Fondre (8 XP)</option>
        </optgroup>
        <optgroup label="Minerais Classiques">
          <option value="15">Minerai de Lapis-Lazuli (15 XP)</option>
          <option value="15">Minerai de Redstone (15 XP)</option>
          <option value="13">Minerai de Fer (13 XP)</option>
          <option value="6">Minerai de Quartz du Nether (6 XP)</option>
          <option value="4">Minerai de Charbon (4 XP)</option>
          <option value="3">Andésite / Diorite / Granite (3 XP)</option>
          <option value="0.5">Roche (0.5 XP)</option>
        </optgroup>
        <optgroup label="Cobblebreaker">
          <option value="20">Particule Nv.6 Cobblebreaker (20 XP)</option>
          <option value="16">Particule Nv.5 Cobblebreaker (16 XP)</option>
          <option value="12">Particule Nv.4 Cobblebreaker (12 XP)</option>
          <option value="8">Particule Nv.3 Cobblebreaker (8 XP)</option>
          <option value="4">Particule Nv.2 Cobblebreaker (4 XP)</option>
          <option value="2">Particule Nv.1 Cobblebreaker (2 XP)</option>
        </optgroup>
      `,
      farmer: `
        <optgroup label="Récolte & Cultures">
          <option value="50">Kiwano - Casser (50 XP)</option>
          <option value="20">Chervil - Casser (20 XP)</option>
          <option value="10">Eggplant - Casser (10 XP)</option>
          <option value="5">Citrouille - Casser (5 XP)</option>
          <option value="4">Melon - Casser (4 XP)</option>
          <option value="2.5">Carotte - Casser (2.5 XP)</option>
          <option value="2">Pomme de terre - Casser (2 XP)</option>
          <option value="1.5">Graine (Seed) - Casser (1.5 XP)</option>
        </optgroup>
        <optgroup label="Broyage & Craft">
          <option value="6">Lingot de Paladium - Broyer (6 XP)</option>
          <option value="4.5">Lingot de Titane - Broyer (4.5 XP)</option>
          <option value="4">Tarte à la citrouille - Crafter (4 XP)</option>
          <option value="3">Lingot d'Améthyste - Broyer (3 XP)</option>
          <option value="1">Pain - Crafter (1 XP)</option>
        </optgroup>
      `,
      hunter: `
        <optgroup label="Pêche Paladium">
          <option value="15000">Kraken - Pêcher (15 000 XP)</option>
          <option value="10000">Baleine - Pêcher (10 000 XP)</option>
          <option value="750">Poisson à exp - Pêcher (750 XP)</option>
          <option value="550">Poisson lune - Pêcher (550 XP)</option>
          <option value="450">Thon rouge - Pêcher (450 XP)</option>
          <option value="300">Raie Manta - Pêcher (300 XP)</option>
          <option value="225">Bar - Pêcher (225 XP)</option>
          <option value="200">Poisson-clown - Pêcher (200 XP)</option>
          <option value="150">Carpe - Pêcher (150 XP)</option>
          <option value="75">Poisson-globe - Pêcher (75 XP)</option>
          <option value="35">Saumon cru - Pêcher (35 XP)</option>
          <option value="25">Poisson cru - Pêcher (25 XP)</option>
        </optgroup>
        <optgroup label="Monstres & Boss">
          <option value="2500">Ghast - Tuer (2 500 XP)</option>
          <option value="1500">Enderman - Tuer (1 500 XP)</option>
          <option value="1000">Wither - Tuer (1 000 XP)</option>
          <option value="600">Zombie Pigman - Tuer (600 XP)</option>
          <option value="40">Creeper - Tuer (40 XP)</option>
          <option value="30">Perroquet - Tuer (30 XP)</option>
          <option value="25">Escargot - Tuer (25 XP)</option>
          <option value="25">Zombie / Squelette - Tuer (25 XP)</option>
          <option value="20">Chèvre - Tuer (20 XP)</option>
          <option value="14">Vache / Lapin / Mouton / Poule / Cochon - Tuer (14 XP)</option>
          <option value="10">Poulpe - Tuer (10 XP)</option>
        </optgroup>
        <optgroup label="Cuisson Viande">
          <option value="15">Saumon / Poisson cuit - Cuire (15 XP)</option>
          <option value="10">Steak / Côtelette / Poulet / Mouton grillé - Cuire (10 XP)</option>
        </optgroup>
      `,
      alchemist: `
        <optgroup label="Sève & Chaudron">
          <option value="240">Érable Log - Extraire Sève (240 XP)</option>
          <option value="120">Judeecercis Log - Extraire Sève (120 XP)</option>
          <option value="100">Paladium Flower - Chaudron (100 XP)</option>
          <option value="60">Jacaranda Log - Extraire Sève (60 XP)</option>
        </optgroup>
        <optgroup label="Potions & Ingrédients">
          <option value="60">Potion d'Invisibilité (60 XP)</option>
          <option value="50">Potion de Vitesse II (50 XP)</option>
          <option value="35">Potion de Force I (35 XP)</option>
          <option value="25">Potion de Soin I (25 XP)</option>
          <option value="15">Larme de Ghast - Obtenir (15 XP)</option>
          <option value="5">Crème de magma - Crafter (5 XP)</option>
          <option value="3">Poudre de Blaze - Crafter (3 XP)</option>
          <option value="2">Verrue du Nether - Cultiver (2 XP)</option>
          <option value="0.5">Fiole d'eau - Remplir (0.5 XP)</option>
        </optgroup>
      `
    },
    bedrock: {
      miner: `
        <optgroup label="Cuisson au Four (Bedrock)">
          <option value="150">Lingot de Paladium - Fondre (150 XP)</option>
          <option value="50">Lingot de Titane - Fondre (50 XP)</option>
        </optgroup>
        <optgroup label="Minerais (Bedrock)">
          <option value="27">Titanium Ore - Casser (27 XP)</option>
          <option value="8">Random Ore - Casser (8 XP)</option>
          <option value="4">Nugget Titanium Ore - Casser (4 XP)</option>
          <option value="2">Nugget Amethyst Ore - Casser (2 XP)</option>
        </optgroup>
      `,
      farmer: `
        <optgroup label="Récolte (Bedrock)">
          <option value="2">Pomme de terre - Casser (2 XP)</option>
          <option value="2">Carotte - Casser (2 XP)</option>
        </optgroup>
      `,
      hunter: `
        <optgroup label="Chasse (Bedrock)">
          <option value="40">Creeper - Tuer (40 XP)</option>
          <option value="25">Zombie - Tuer (25 XP)</option>
        </optgroup>
      `,
      alchemist: `
        <optgroup label="Alchimie (Bedrock)">
          <option value="100">Paladium Flower (100 XP)</option>
        </optgroup>
      `
    }
  };

  const versionSelect = document.getElementById('versionSelect');
  const jobSelect = document.getElementById('jobSelect');
  const oreSelect = document.getElementById('ore');
  const currentLevelInput = document.getElementById('currentLevel');
  const currentXPInput = document.getElementById('currentXP');
  const targetLevelInput = document.getElementById('targetLevel');
  const boosterCheckbox = document.getElementById('booster');

  // --- CHARGEMENT DES SAUVEGARDES DU CALCULATEUR ---
  if (localStorage.getItem('calc_version') && versionSelect) versionSelect.value = localStorage.getItem('calc_version');
  if (localStorage.getItem('calc_job') && jobSelect) jobSelect.value = localStorage.getItem('calc_job');
  if (localStorage.getItem('calc_currentLevel') && currentLevelInput) currentLevelInput.value = localStorage.getItem('calc_currentLevel');
  if (localStorage.getItem('calc_currentXP') && currentXPInput) currentXPInput.value = localStorage.getItem('calc_currentXP');
  if (localStorage.getItem('calc_targetLevel') && targetLevelInput) targetLevelInput.value = localStorage.getItem('calc_targetLevel');
  if (localStorage.getItem('calc_booster') !== null && boosterCheckbox) boosterCheckbox.checked = localStorage.getItem('calc_booster') === 'true';

  function updateOreOptions() {
    const selectedVersion = versionSelect ? versionSelect.value : 'java';
    const selectedJob = jobSelect ? jobSelect.value : 'miner';
    
    if (jobDatabase[selectedVersion] && jobDatabase[selectedVersion][selectedJob]) {
      oreSelect.innerHTML = jobDatabase[selectedVersion][selectedJob];
    } else {
      oreSelect.innerHTML = jobDatabase.java.miner;
    }

    if (localStorage.getItem('calc_ore') && oreSelect) {
      oreSelect.value = localStorage.getItem('calc_ore');
    }
  }

  function saveCalcData() {
    if (versionSelect) localStorage.setItem('calc_version', versionSelect.value);
    if (jobSelect) localStorage.setItem('calc_job', jobSelect.value);
    if (currentLevelInput) localStorage.setItem('calc_currentLevel', currentLevelInput.value);
    if (currentXPInput) localStorage.setItem('calc_currentXP', currentXPInput.value);
    if (targetLevelInput) localStorage.setItem('calc_targetLevel', targetLevelInput.value);
    if (oreSelect) localStorage.setItem('calc_ore', oreSelect.value);
    if (boosterCheckbox) localStorage.setItem('calc_booster', boosterCheckbox.checked);
  }

  // Événements de mise à jour et sauvegarde
  if (jobSelect) jobSelect.addEventListener('change', () => { updateOreOptions(); saveCalcData(); });
  if (versionSelect) versionSelect.addEventListener('change', () => { updateOreOptions(); saveCalcData(); });
  if (currentLevelInput) currentLevelInput.addEventListener('input', saveCalcData);
  if (currentXPInput) currentXPInput.addEventListener('input', saveCalcData);
  if (targetLevelInput) targetLevelInput.addEventListener('input', saveCalcData);
  if (oreSelect) oreSelect.addEventListener('change', saveCalcData);
  if (boosterCheckbox) boosterCheckbox.addEventListener('change', saveCalcData);

  updateOreOptions();

  // --- CALCULATEUR D'XP ---
  const calcBtn = document.getElementById('calc-btn');
  const resultEl = document.getElementById('result');

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      saveCalcData();

      const currentLevel = parseInt(currentLevelInput.value) || 1;
      const currentXP = parseInt(currentXPInput.value) || 0;
      const targetLevel = parseInt(targetLevelInput.value) || 1;
      const oreXP = parseFloat(oreSelect.value) || 1;
      const hasBooster = boosterCheckbox.checked;

      if (targetLevel <= currentLevel) {
        resultEl.textContent = "Le niveau visé doit être supérieur au niveau actuel.";
        return;
      }

      let targetTotalXP = getXPForLevel(targetLevel);
      let remainingXP = targetTotalXP - currentXP;

      if (remainingXP <= 0) {
        resultEl.textContent = "Objectif déjà atteint !";
        return;
      }

      let finalXPPerBlock = hasBooster ? (oreXP * 1.5) : oreXP;
      let totalBlocks = Math.ceil(remainingXP / finalXPPerBlock);
      let totalStacks = (totalBlocks / 64).toFixed(1);

      resultEl.innerHTML = `
        XP manquante : <strong>${remainingXP.toLocaleString('fr-FR')} XP</strong><br>
        Unités à farm/miner/tuer : <strong>${totalBlocks.toLocaleString('fr-FR')}</strong> (~${totalStacks} stacks)
      `;
    });
  }

  // --- PALADIUM CLICKER ---
  let score = parseFloat(localStorage.getItem('clicker_score')) || 0;
  let clickValue = parseInt(localStorage.getItem('clicker_clickValue')) || 1;
  let autoValue = parseInt(localStorage.getItem('clicker_autoValue')) || 0;
  let clickCost = parseInt(localStorage.getItem('clicker_clickCost')) || 15;
  let autoCost = parseInt(localStorage.getItem('clicker_autoCost')) || 50;
  let clickCount = parseInt(localStorage.getItem('clicker_clickCount')) || 0;
  let autoCount = parseInt(localStorage.getItem('clicker_autoCount')) || 0;

  const scoreEl = document.getElementById('score');
  const ppsEl = document.getElementById('pps');
  const clickBtn = document.getElementById('click-btn');
  const buyClickBtn = document.getElementById('buy-click');
  const buyAutoBtn = document.getElementById('buy-auto');
  const costClickEl = document.getElementById('cost-click');
  const costAutoEl = document.getElementById('cost-auto');
  const countClickEl = document.getElementById('count-click');
  const countAutoEl = document.getElementById('count-auto');

  function saveGame() {
    localStorage.setItem('clicker_score', score);
    localStorage.setItem('clicker_clickValue', clickValue);
    localStorage.setItem('clicker_autoValue', autoValue);
    localStorage.setItem('clicker_clickCost', clickCost);
    localStorage.setItem('clicker_autoCost', autoCost);
    localStorage.setItem('clicker_clickCount', clickCount);
    localStorage.setItem('clicker_autoCount', autoCount);
  }

  if (clickBtn) {
    clickBtn.addEventListener('click', () => {
      score += clickValue;
      updateClickerUI();
      saveGame();
    });
  }

  if (buyClickBtn) {
    buyClickBtn.addEventListener('click', () => {
      if (score >= clickCost) {
        score -= clickCost;
        clickValue += 1;
        clickCount += 1;
        clickCost = Math.floor(clickCost * 1.5);
        updateClickerUI();
        saveGame();
      }
    });
  }

  if (buyAutoBtn) {
    buyAutoBtn.addEventListener('click', () => {
      if (score >= autoCost) {
        score -= autoCost;
        autoValue += 1;
        autoCount += 1;
        autoCost = Math.floor(autoCost * 1.6);
        updateClickerUI();
        saveGame();
      }
    });
  }

  setInterval(() => {
    if (autoValue > 0) {
      score += autoValue;
      updateClickerUI();
      saveGame();
    }
  }, 1000);

  function updateClickerUI() {
    if (scoreEl) scoreEl.textContent = Math.floor(score);
    if (ppsEl) ppsEl.textContent = `${autoValue} / seconde`;
    if (costClickEl) costClickEl.textContent = clickCost;
    if (costAutoEl) costAutoEl.textContent = autoCost;
    if (countClickEl) countClickEl.textContent = clickCount;
    if (countAutoEl) countAutoEl.textContent = autoCount;
    if (buyClickBtn) buyClickBtn.disabled = score < clickCost;
    if (buyAutoBtn) buyAutoBtn.disabled = score < autoCost;
  }

  updateClickerUI();

});
