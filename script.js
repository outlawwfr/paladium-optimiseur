const xpParNiveau = {
  1: 0,
  2: 25000,
  3: 45000,
  4: 73751,
  5: 118886,
  6: 180000,
  7: 270000,
  8: 380000,
  9: 510000,
  10: 670000,
  11: 870000,
  12: 1120000,
  13: 1420000,
  14: 1780000,
  15: 2200000,
  16: 2700000,
  17: 3300000,
  18: 4000000,
  19: 4800000,
  20: 5800000
};

let blocsRestants = 0;

function calculer() {
  let xpActuelle = parseFloat(document.getElementById('currentXP').value) || 0;
  let nivVise = parseInt(document.getElementById('targetLevel').value) || 4;
  
  // Conversion explicite en nombre avec fallback sur 0.5
  let oreVal = document.getElementById('oreSelect').value;
  let xpBaseParBloc = parseFloat(oreVal);
  if (isNaN(xpBaseParBloc) || xpBaseParBloc <= 0) {
    xpBaseParBloc = 0.5;
  }

  let boosterActive = document.getElementById('booster').checked;

  let totalXpCible = xpParNiveau[nivVise] || 0;
  let xpManquante = totalXpCible - xpActuelle;

  if (xpManquante <= 0) {
    document.getElementById('output').innerHTML = "Tu as déjà atteint cet objectif !";
    if (document.getElementById('shortcutInfo')) {
      document.getElementById('shortcutInfo').style.display = 'none';
    }
    return;
  }

  let xpReelleParBloc = boosterActive ? xpBaseParBloc * 1.5 : xpBaseParBloc;
  blocsRestants = Math.ceil(xpManquante / xpReelleParBloc);

  afficherResultat(xpManquante);
  if (document.getElementById('shortcutInfo')) {
    document.getElementById('shortcutInfo').style.display = 'block';
  }
}

function minerUnBloc() {
  if (blocsRestants > 0) {
    blocsRestants--;

    let oreVal = document.getElementById('oreSelect').value;
    let xpBaseParBloc = parseFloat(oreVal) || 0.5;
    let boosterActive = document.getElementById('booster').checked;
    let xpGain = boosterActive ? xpBaseParBloc * 1.5 : xpBaseParBloc;

    let xpInput = document.getElementById('currentXP');
    let nouvelleXP = (parseFloat(xpInput.value) || 0) + xpGain;
    xpInput.value = nouvelleXP;

    let nivVise = parseInt(document.getElementById('targetLevel').value) || 4;
    let totalXpCible = xpParNiveau[nivVise] || 0;
    let xpManquante = totalXpCible - nouvelleXP;

    afficherResultat(Math.max(0, xpManquante));
  }
}

function afficherResultat(xpManquante) {
  if (blocsRestants <= 0) {
    document.getElementById('output').innerHTML = "<strong style='color:#28a745;'>🎉 Objectif atteint ! GG !</strong>";
    if (document.getElementById('shortcutInfo')) {
      document.getElementById('shortcutInfo').style.display = 'none';
    }
  } else {
    document.getElementById('output').innerHTML = `
      XP manquante : <strong style="color:#ff6b00;">${Math.round(xpManquante).toLocaleString()} XP</strong><br>
      Blocs à miner : <strong style="color:#ff6b00; font-size:20px;">${blocsRestants.toLocaleString()}</strong>
    `;
  }
}

document.addEventListener('keydown', function(event) {
  const targetTag = event.target.tagName.toLowerCase();
  if (targetTag === 'input' || targetTag === 'select') return;

  if (event.key === 'r' || event.key === 'R') {
    minerUnBloc();
  }
});
// --- JEU CLICKER ---
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
