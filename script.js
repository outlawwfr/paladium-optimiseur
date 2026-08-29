// --- DATA MÉTIERS PALADIUM V12 ---
const jobsData = {
  miner: [
    { name: "Minerai de Paladium Vert (340 XP)", xp: 340 },
    { name: "Minerai de Paladium (150 XP)", xp: 150 },
    { name: "Minerai de Titane (50 XP)", xp: 50 },
    { name: "Minerai d'Améthyste (20 XP)", xp: 20 },
    { name: "Minerai d'Or (12 XP)", xp: 12 },
    { name: "Minerai de Fer (8 XP)", xp: 8 },
    { name: "Pierre / Stone (0.5 XP)", xp: 0.5 }
  ],
  farmer: [
    { name: "Eggplant / Aubergine (40 XP)", xp: 40 },
    { name: "Cherries / Cerises (25 XP)", xp: 25 },
    { name: "Choco Apple (20 XP)", xp: 20 },
    { name: "Graine de Paladium (15 XP)", xp: 15 },
    { name: "Citrouille / Pastèque (8 XP)", xp: 8 },
    { name: "Blé / Carotte / Patate (5 XP)", xp: 5 }
  ],
  alchemist: [
    { name: "Fiole de Paladium (200 XP)", xp: 200 },
    { name: "Potion de Soin III (120 XP)", xp: 120 },
    { name: "Potion de Force II (80 XP)", xp: 80 },
    { name: "Potion de Speed II (50 XP)", xp: 50 },
    { name: "Préparation Fiole basique (15 XP)", xp: 15 }
  ],
  hunter: [
    { name: "Ender Dragon (5000 XP)", xp: 5000 },
    { name: "Wither Boss (1500 XP)", xp: 1500 },
    { name: "Guardian (50 XP)", xp: 50 },
    { name: "Enderman (25 XP)", xp: 25 },
    { name: "Zombie / Squelette / Creeper (12 XP)", xp: 12 },
    { name: "Vache / Cochon / Poulet (4 XP)", xp: 4 }
  ]
};

// Formule d'XP par niveau
function getXPForLevel(lvl) {
  return Math.floor(100 * Math.pow(lvl, 1.8));
}

function getTotalXPBetween(startLvl, startXP, targetLvl) {
  let totalNeeded = 0;
  for (let i = startLvl; i < targetLvl; i++) {
    totalNeeded += getXPForLevel(i);
  }
  return Math.max(0, totalNeeded - startXP);
}

// Elements DOM Calculateur
const jobSelect = document.getElementById("jobSelect");
const oreSelect = document.getElementById("ore");
const calcBtn = document.getElementById("calc-btn");
const resultDiv = document.getElementById("result");

function updateItemList() {
  const selectedJob = jobSelect.value;
  const items = jobsData[selectedJob] || [];
  oreSelect.innerHTML = "";
  items.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.xp;
    opt.textContent = item.name;
    oreSelect.appendChild(opt);
  });
}

jobSelect.addEventListener("change", updateItemList);
updateItemList();

calcBtn.addEventListener("click", () => {
  const currentLvl = parseInt(document.getElementById("currentLevel").value) || 1;
  const currentXP = parseInt(document.getElementById("currentXP").value) || 0;
  const targetLvl = parseInt(document.getElementById("targetLevel").value) || 2;
  const baseXPPerAction = parseFloat(oreSelect.value) || 1;
  const hasBooster = document.getElementById("booster").checked;

  if (targetLvl <= currentLvl) {
    resultDiv.innerHTML = "Le niveau visé doit être supérieur au niveau actuel.";
    return;
  }

  const neededXP = getTotalXPBetween(currentLvl, currentXP, targetLvl);
  const xpPerAction = hasBooster ? baseXPPerAction * 1.5 : baseXPPerAction;
  const actionsNeeded = Math.ceil(neededXP / xpPerAction);

  resultDiv.innerHTML = `
    <strong>XP totale nécessaire :</strong> ${neededXP.toLocaleString()} XP<br>
    <strong>Actions à réaliser :</strong> ${actionsNeeded.toLocaleString()} fois
  `;
});

// --- PALADIUM CLICKER ---
let score = 0;
let clickPower = 1;
let autoPower = 0;

let costClick = 15;
let costAuto = 50;

let countClick = 0;
let countAuto = 0;

const scoreEl = document.getElementById("score");
const ppsEl = document.getElementById("pps");
const clickBtn = document.getElementById("click-btn");

const buyClickBtn = document.getElementById("buy-click");
const buyAutoBtn = document.getElementById("buy-auto");

const costClickEl = document.getElementById("cost-click");
const costAutoEl = document.getElementById("cost-auto");
const countClickEl = document.getElementById("count-click");
const countAutoEl = document.getElementById("count-auto");

clickBtn.addEventListener("click", () => {
  score += clickPower;
  updateClickerDisplay();
});

buyClickBtn.addEventListener("click", () => {
  if (score >= costClick) {
    score -= costClick;
    clickPower += 1;
    countClick++;
    costClick = Math.floor(costClick * 1.5);
    updateClickerDisplay();
  }
});

buyAutoBtn.addEventListener("click", () => {
  if (score >= costAuto) {
    score -= costAuto;
    autoPower += 1;
    countAuto++;
    costAuto = Math.floor(costAuto * 1.6);
    updateClickerDisplay();
  }
});

setInterval(() => {
  if (autoPower > 0) {
    score += autoPower;
    updateClickerDisplay();
  }
}, 1000);

function updateClickerDisplay() {
  scoreEl.textContent = score.toLocaleString();
  ppsEl.textContent = `${autoPower} / seconde`;
  
  costClickEl.textContent = costClick;
  costAutoEl.textContent = costAuto;
  
  countClickEl.textContent = countClick;
  countAutoEl.textContent = countAuto;
}
