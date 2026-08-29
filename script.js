// --- CALCULATEUR MINEUR ---
function calculate() {
  const currentLevel = parseInt(document.getElementById('currentLevel').value) || 1;
  const currentXP = parseInt(document.getElementById('currentXP').value) || 0;
  const targetLevel = parseInt(document.getElementById('targetLevel').value) || 1;
  const oreXP = parseFloat(document.getElementById('ore').value) || 1;
  const hasBooster = document.getElementById('booster').checked;

  if (targetLevel <= currentLevel) {
    document.getElementById('result').textContent = "Le niveau visé doit être supérieur au niveau actuel.";
    return;
  }

  // Formule d'estimation d'XP par niveau
  function getXPForLevel(lvl) {
    return Math.floor(1000 * Math.pow(lvl, 1.8));
  }

  let totalXPNeeded = 0;
  for (let l = currentLevel; l < targetLevel; l++) {
    totalXPNeeded += getXPForLevel(l);
  }

  let remainingXP = totalXPNeeded - currentXP;
  if (remainingXP <= 0) {
    document.getElementById('result').textContent = "Objectif déjà atteint !";
    return;
  }

  let finalXPPerBlock = hasBooster ? (oreXP * 1.5) : oreXP;
  let totalBlocks = Math.ceil(remainingXP / finalXPPerBlock);
  let totalStacks = (totalBlocks / 64).toFixed(1);

  document.getElementById('result').innerHTML = `
    XP manquante : <strong>${remainingXP.toLocaleString()} XP</strong><br>
    Blocs à miner : <strong>${totalBlocks.toLocaleString()}</strong> (~${totalStacks} stacks)
  `;
}

// --- PALADIUM CLICKER ---
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
  scoreEl.textContent = Math.floor(score);
  ppsEl.textContent = `${autoValue} / seconde`;
  costClickEl.textContent = clickCost;
  costAutoEl.textContent = autoCost;
  countClickEl.textContent = clickCount;
  countAutoEl.textContent = autoCount;
  buyClickBtn.disabled = score < clickCost;
  buyAutoBtn.disabled = score < autoCost;
}

updateClickerUI();
