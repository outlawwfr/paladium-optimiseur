document.addEventListener('DOMContentLoaded', () => {

  // --- BASE DE DONNÉES MÉTIERS (OFFICIELLE PALADIUM V12) ---
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
      <optgroup label="Récolte & Actions">
        <option value="5">Citrouille - Casser (5 XP) [Nv. 7]</option>
        <option value="4">Melon - Casser (4 XP) [Nv. 6]</option>
        <option value="2.5">Carotte - Casser (2.5 XP) [Nv. 3]</option>
        <option value="2">Pomme de terre - Casser (2 XP) [Nv. 2]</option>
        <option value="2">Pomme de terre cuite - Cuire (2 XP) [Nv. 2]</option>
        <option value="1.5">Graine (Seed) - Casser (1.5 XP) [Nv. 2]</option>
        <option value="1">Pain (Bread) - Crafter (1 XP) [Nv. 1]</option>
      </optgroup>
    `,
    hunter: `
      <optgroup label="Monstres & Créatures">
        <option value="2500">Ghast - Tuer (2 500 XP) [Nv. 17]</option>
        <option value="1500">Enderman - Tuer (1 500 XP) [Nv. 18]</option>
        <option value="600">Zombie Pigman - Tuer (600 XP) [Nv. 14]</option>
        <option value="150">Jelly Fish - Tuer (150 XP)</option>
        <option value="120">Snake - Tuer (120 XP) [Nv. 15]</option>
        <option value="80">Crab - Tuer (80 XP) [Nv. 12]</option>
        <option value="60">Panda - Tuer (60 XP) [Nv. 11]</option>
        <option value="25">Blaze - Tuer (25 XP) [Nv. 15]</option>
      </optgroup>
    `,
    alchemist: `
      <optgroup label="Sève & Portails">
        <option value="240">Erable Log - Extraire Sève (240 XP) [Nv. 16]</option>
        <option value="120">Judeecercis Log - Extraire Sève (120 XP) [Nv. 6]</option>
        <option value="100">Paladium Flower - Chaudron (100 XP)</option>
        <option value="60">Jacaranda Log - Extraire Sève (60 XP) [Nv. 3]</option>
        <option value="40">Paladium Ingot - Portail (40 XP) [Nv. 10]</option>
        <option value="30">Lightning Potion - Crafter (30 XP) [Nv. 1]</option>
        <option value="20">Titane Ingot - Portail (20 XP) [Nv. 7]</option>
        <option value="20">Extractor - Crafter (20 XP) [Nv. 1]</option>
        <option value="6">Amethyst Ingot - Portail (6 XP) [Nv. 5]</option>
      </optgroup>
      <optgroup label="Glueballs & Chaudron">
        <option value="15">Glueball Spéciale (Gray, Cyan, Yellow, Purple...) - Chaudron (15 XP) [Nv. 10]</option>
        <option value="2">Glueball Basique (Green, Blue, Red) - Chaudron (2 XP) [Nv. 6]</option>
        <option value="2">Fleurs Supérieures (Tulipes, Allium, Daisy...) - Chaudron (2 XP) [Nv. 3]</option>
        <option value="1">Blue Orchid - Chaudron (1 XP) [Nv. 3]</option>
        <option value="0.75">Dandelion / Poppy - Chaudron (0.75 XP) [Nv. 3]</option>
      </optgroup>
      <optgroup label="Bûches & Matériaux de base">
        <option value="10">Jacaranda / Judeecercis / Erable Log - Casser (10 XP) [Nv. 1]</option>
        <option value="0.2">Empty Flask - Crafter (0.2 XP) [Nv. 1]</option>
      </optgroup>
    
  
    
  };

  const jobSelect = document.getElementById('jobSelect');
  const oreSelect = document.getElementById('ore');

  function updateOreOptions() {
    const selectedJob = jobSelect.value;
    oreSelect.innerHTML = jobOptions[selectedJob] || jobOptions.miner;
  }

  if (jobSelect) {
    jobSelect.addEventListener('change', updateOreOptions);
    updateOreOptions();
  }

  // --- CALCULATEUR ---
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
        Unités à farm/miner/tuer : <strong>${totalBlocks.toLocaleString()}</strong> (~${totalStacks} stacks)
      `;
    });
  }

  // --- CLICKER ---
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
