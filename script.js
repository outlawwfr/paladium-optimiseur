document.addEventListener('DOMContentLoaded', () => {

  // --- BASE DE DONNÉES MÉTIERS (DONNÉES OFFICIELLES PALADIUM) ---
  const jobOptions = {
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
      <optgroup label="Minerais Classiques">
        <option value="15">Minerai de Lapis-Lazuli (15 XP)</option>
        <option value="15">Minerai de Redstone (15 XP)</option>
        <option value="13">Minerai de Fer (13 XP)</option>
        <option value="6">Minerai de Quartz du Nether (6 XP)</option>
        <option value="4">Minerai de Charbon (4 XP)</option>
      </optgroup>
      <optgroup label="Cobblebreaker">
        <option value="20">Particule Nv.5 Cobblebreaker (20 XP)</option>
        <option value="12">Particule Nv.4 Cobblebreaker (12 XP)</option>
        <option value="8">Particule Nv.3 Cobblebreaker (8 XP)</option>
        <option value="4">Particule Nv.2 Cobblebreaker (4 XP)</option>
        <option value="2">Particule Nv.1 Cobblebreaker (2 XP)</option>
      </optgroup>
    `,
    farmer: `
      <optgroup label="Cultures Rares">
        <option value="50">Graine de Paladium (50 XP)</option>
        <option value="25">Choco-Champignon (25 XP)</option>
        <option value="10">Verre à Expérience (10 XP)</option>
      </optgroup>
      <optgroup label="Cultures Classiques">
        <option value="2">Melon / Citrouille (2 XP)</option>
        <option value="1">Cactus / Canne à sucre (1 XP)</option>
        <option value="0.5">Blé / Carotte / Pomme de terre (0.5 XP)</option>
        <option value="0.3">Nether Wart (0.3 XP)</option>
      </optgroup>
    `,
    alchemist: `
      <optgroup label="Potions Améliorées">
        <option value="150">Potion Paladium / Endium (150 XP)</option>
        <option value="75">Potion Nv.3 / Custom (75 XP)</option>
        <option value="35">Potion Nv.2 (Force II, Speed II) (35 XP)</option>
        <option value="15">Potion Nv.1 (Soin, Vitesse) (15 XP)</option>
      </optgroup>
      <optgroup label="Préparations">
        <option value="5">Création de Fiole d'eau / Base (5 XP)</option>
      </optgroup>
    `,
    enchanter: `
      <optgroup label="Enchantements">
        <option value="200">Livre Paladium / Moddé (200 XP)</option>
        <option value="100">Enchantement Nv.30 (Table Max) (100 XP)</option>
        <option value="40">Enchantement Nv.15-29 (40 XP)</option>
        <option value="15">Enchantement Nv.1-14 (15 XP)</option>
      </optgroup>
      <optgroup label="Artisanat">
        <option value="10">Création de Bouteille d'Expérience (10 XP)</option>
      </optgroup>
    `,
    hunter: `
      <optgroup label="Boss & Mobs Spéciaux">
        <option value="500">Boss Paladium / Enderdragon (500 XP)</option>
        <option value="150">Wither / Mobs de Donjon (150 XP)</option>
      </optgroup>
      <optgroup label="Monstres (Hostiles)">
        <option value="15">Enderman / Creeper (15 XP)</option>
        <option value="10">Zombie / Squelette / Araignée (10 XP)</option>
      </optgroup>
      <optgroup label="Animaux (Passifs)">
        <option value="3">Vache / Cochon / Mouton (3 XP)</option>
        <option value="1">Poulet (1 XP)</option>
      </optgroup>
    `
  };

  const jobSelect = document.getElementById('jobSelect');
  const oreSelect = document.getElementById('ore');

  // Mettre à jour la liste selon le métier choisi
  function updateOreOptions() {
    const selectedJob = jobSelect.value;
    oreSelect.innerHTML = jobOptions[selectedJob] || jobOptions.miner;
  }

  if (jobSelect) {
    jobSelect.addEventListener('change', updateOreOptions);
    updateOreOptions();
  }

  // --- LOGIQUE DU CALCULATEUR ---
  const calcBtn = document.getElementById('calc-btn');
  const resultEl = document.getElementById('result');

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const currentLevel = parseInt(document.getElementById('currentLevel').value) || 1;
      const currentXP = parseInt(document.getElementById('currentXP').value) || 0;
      const targetLevel = parseInt(document.getElementById('targetLevel').value) || 1;
      const oreXP = parseFloat(document.getElementById('ore').value) || 1;
      const hasBooster = document.getElementById('booster').checked;

      if (targetLevel <= currentLevel) {
        resultEl.textContent = "Le niveau visé doit être supérieur au niveau actuel.";
        return;
      }

      function getXPForLevel(lvl) {
        return Math.floor(1000 * Math.pow(lvl, 1.8));
      }

      let totalXPNeeded = 0;
      for (let l = currentLevel; l < targetLevel; l++) {
        totalXPNeeded += getXPForLevel(l);
      }

      let remainingXP = totalXPNeeded - currentXP;
      if (remainingXP <= 0) {
        resultEl.textContent = "Objectif déjà atteint !";
        return;
      }

      let finalXPPerBlock = hasBooster ? (oreXP * 1.5) : oreXP;
      let totalBlocks = Math.ceil(remainingXP / finalXPPerBlock);
      let totalStacks = (totalBlocks / 64).toFixed(1);

      resultEl.innerHTML = `
        XP manquante : <strong>${remainingXP.toLocaleString()} XP</strong><br>
        Unités à farm/miner : <strong>${totalBlocks.toLocaleString()}</strong> (~${totalStacks} stacks)
      `;
    });
  }

  // --- LOGIQUE DU PALADIUM CLICKER ---
  let score = 0;
  let clickValue = 1;
  let autoValue = 0;
  let clickCost = 15;
  let autoCost = 50;
  let clickCount = 0;
  let autoCount = 0;

  const scoreEl = document.getElementById('score');
  const ppsEl = document.getElementById('pps');
  const clickBtn = document.getElementById('click-btn');
  const buyClickBtn = document.getElementById('buy-click');
  const buyAutoBtn = document.getElementById('buy-auto');
  const costClickEl = document.getElementById('cost-click');
  const costAutoEl = document.getElementById('cost-auto');
  const countClickEl = document.getElementById('count-click');
  const countAutoEl = document.getElementById('count-auto');

  if (clickBtn) {
    clickBtn.addEventListener('click', () => {
      score += clickValue;
      updateClickerUI();
    });

    buyClickBtn.addEventListener('click', () => {
      if (score >= clickCost) {
        score -= clickCost;
        clickValue += 1;
        clickCount += 1;
        clickCost = Math.floor(clickCost * 1.5);
        updateClickerUI();
      }
    });

    buyAutoBtn.addEventListener('click', () => {
      if (score >= autoCost) {
        score -= autoCost;
        autoValue += 1;
        autoCount += 1;
        autoCost = Math.floor(autoCost * 1.6);
        updateClickerUI();
      }
    });

    setInterval(() => {
      if (autoValue > 0) {
        score += autoValue;
        updateClickerUI();
      }
    }, 1000);
  }

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
