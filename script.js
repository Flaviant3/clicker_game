let clicks = 0;
let clickMultiplier = 1;
let questsCompleted = 0;
let exp = 0;
let level = 1;
let flavCoins = 0;
let currentUsername = ""; // Ajoutez cette variable

function startGame() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    // Mettez à jour le nom d'utilisateur actuel
    currentUsername = username;

    // Chargez les données du joueur actuel
    loadGameData();

    document.getElementById("menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    displayQuest();
  }
}

function clickHandler(event) {
  clicks += clickMultiplier;
  exp += 1;

  // Update level and reset exp if level up
  if (exp >= 10 * level) {
    level++;
    exp = 0;
  }

  updateClickCount();
  updateLevel();
  updateExpBar();
  playClickAnimation(event); // Passez l'événement à la fonction
  saveGameData();
}

function updateLevel() {
  document.getElementById("level").textContent = `Level: ${level}`;
}

function updateExpBar() {
  const progress = (exp / (10 * level)) * 100;
  document.getElementById("exp-progress").style.width = `${progress}%`;
}

function playClickAnimation(event) {
  const clickEffect = document.getElementById("click-effect");
  clickEffect.style.display = "block";
  clickEffect.innerHTML = "+1";

  // Position the click effect at the click location
  const xPos = event.clientX - 20; // Adjust for better visual alignment
  const yPos = event.clientY - 20; // Adjust for better visual alignment
  clickEffect.style.left = xPos + "px";
  clickEffect.style.top = yPos + "px";

  // Animate the click effect
  setTimeout(() => {
    clickEffect.style.display = "none";
  }, 500);
}
function openShop() {
  $("#shopModal").modal("show");
}

function openQuests() {
  $("#questsModal").modal("show");
}

function buyUpgrade() {
  if (clicks >= 10) {
    clicks -= 10;
    clickMultiplier *= 2;
    updateClickCount();
    alert("Upgrade purchased!");
    saveGameData();
  } else {
    alert("Not enough clicks to buy the upgrade.");
  }
}

function buyMultiplier() {
  if (clicks >= 50) {
    clicks -= 50;
    clickMultiplier *= 2;
    updateClickCount();
    alert("Click multiplier purchased!");
    saveGameData();
  } else {
    alert("Not enough clicks to buy the click multiplier.");
  }
}

function checkQuestsAutomatically() {
  setInterval(() => {
    // Vérifiez chaque quête
    checkQuestCompletion(1, 50, "Quest 1 completed! You earned 20 FlavCoins.");
    checkQuestCompletion(2, 5, "Quest 2 completed! You earned 30 FlavCoins.");
    checkQuestCompletion(3, 1, "Quest 3 completed! You earned 15 FlavCoins.");
  }, 5000); // Vérifiez toutes les 5 secondes (vous pouvez ajuster cette valeur)
}

function checkQuestCompletion(questId, condition, notificationMessage) {
  if (
    questId === 1 &&
    clicks >= condition &&
    document.getElementById("quest1").classList.contains("completed") === false
  ) {
    clicks -= condition;
    flavCoins += 20;
    document.getElementById("quest1").classList.add("completed");
    displayAutoNotification(notificationMessage);
    saveGameData();
  } else if (
    questId === 2 &&
    level >= condition &&
    document.getElementById("quest2").classList.contains("completed") === false
  ) {
    flavCoins += 30;
    document.getElementById("quest2").classList.add("completed");
    displayAutoNotification(notificationMessage);
    saveGameData();
  } else if (
    questId === 3 &&
    document.getElementById("quest3").classList.contains("completed") === false
  ) {
    flavCoins += 15;
    document.getElementById("quest3").classList.add("completed");
    displayAutoNotification(notificationMessage);
    saveGameData();
  }
}

function displayAutoNotification(message) {
  let notification = document.createElement("div");
  notification.className = "quest-notification-auto";
  notification.innerText = message;
  document.body.appendChild(notification);

  // Position the notification in the bottom right corner
  notification.style.bottom = "20px";
  notification.style.right = "20px";

  // Add animation class for fade-out effect
  setTimeout(() => {
    notification.style.opacity = "0";
  }, 2000);

  // Remove the notification from the DOM after the animation
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

// Appelez la fonction checkQuestsAutomatically pour démarrer la vérification automatique
checkQuestsAutomatically();

function generateRandomQuest() {
  const questOptions = [
    "Cliquer 20 fois en 10 secondes.",
    "Atteindre 100 clics au total.",
    "Acheter une amélioration dans la boutique.",
    "Cliquer 30 fois en 15 secondes.",
    "Atteindre le niveau 10.",
    "Acheter deux améliorations dans la boutique.",
    "Cliquer 40 fois en 20 secondes.",
    "Atteindre le niveau 15.",
    "Acheter trois améliorations dans la boutique.",
    "Cliquer 50 fois en 25 secondes.",
    "Atteindre le niveau 20.",
    "Acheter quatre améliorations dans la boutique.",
    "Cliquer 60 fois en 30 secondes.",
    "Atteindre le niveau 25.",
    "Acheter cinq améliorations dans la boutique.",
    "Cliquer 70 fois en 35 secondes.",
    "Atteindre le niveau 30.",
    "Acheter six améliorations dans la boutique.",
    "Cliquer 80 fois en 40 secondes.",
    "Atteindre le niveau 35.",
    "Acheter sept améliorations dans la boutique.",
    // Ajoutez plus de quêtes ici
  ];
  return questOptions[Math.floor(Math.random() * questOptions.length)];
}

function displayQuest() {
  const questDescription = generateRandomQuest();
  document.getElementById("quest-description").textContent = questDescription;
}

function completeQuest(questId) {
  let notification = document.createElement("div");
  notification.className = "quest-notification";

  if (
    questId === 1 &&
    clicks >= 50 &&
    document.getElementById("quest1").classList.contains("completed") === false
  ) {
    clicks -= 50;
    flavCoins += 20;
    document.getElementById("quest1").classList.add("completed");
    notification.innerText =
      "Quête 1 accomplie ! Vous avez gagné 20 FlavCoins.";
    notification.style.backgroundColor = "#28a745";
    displayNotification(notification);
    saveGameData();
  } else if (
    questId === 2 &&
    level >= 5 &&
    document.getElementById("quest2").classList.contains("completed") === false
  ) {
    flavCoins += 30;
    document.getElementById("quest2").classList.add("completed");
    notification.innerText =
      "Quête 2 accomplie ! Vous avez gagné 30 FlavCoins.";
    notification.style.backgroundColor = "#28a745";
    displayNotification(notification);
    saveGameData();
  } else if (
    questId === 3 &&
    document.getElementById("quest3").classList.contains("completed") === false
  ) {
    flavCoins += 15;
    document.getElementById("quest3").classList.add("completed");
    notification.innerText =
      "Quête 3 accomplie ! Vous avez gagné 15 FlavCoins.";
    notification.style.backgroundColor = "#28a745";
    displayNotification(notification);
    saveGameData();
  } else if (questId === 4) {
    // Traitez les conditions pour les nouvelles quêtes
    // Assurez-vous de mettre à jour les identifiants de quête, les conditions et les messages
  } else {
    notification.innerText =
      "Vous ne pouvez pas accomplir cette quête pour le moment.";
    notification.style.backgroundColor = "#dc3545";
    displayNotification(notification);
  }

  updateClickCount(); // Mise à jour du solde FlavCoins après avoir complété une quête
}

function displayNotification(notification) {
  document.body.appendChild(notification);

  // Position the notification in the bottom right corner
  notification.style.bottom = "20px";
  notification.style.right = "20px";

  // Add animation class for fade-out effect
  setTimeout(() => {
    notification.style.opacity = "0";
  }, 2000);

  // Remove the notification from the DOM after the animation
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

function updateClickCount() {
  document.getElementById("click-count").textContent = `Clicks: ${
    clicks * clickMultiplier
  }`;
  document.getElementById("flav-coins").textContent = flavCoins; // Mettez à jour le solde FlavCoins
}

function saveGameData() {
  localStorage.setItem(`${currentUsername}-clicks`, clicks);
  localStorage.setItem(`${currentUsername}-exp`, exp);
  localStorage.setItem(`${currentUsername}-level`, level);
  localStorage.setItem(`${currentUsername}-flavCoins`, flavCoins);
}

function loadGameData() {
  const savedClicks = localStorage.getItem(`${currentUsername}-clicks`);
  const savedExp = localStorage.getItem(`${currentUsername}-exp`);
  const savedLevel = localStorage.getItem(`${currentUsername}-level`);
  const savedFlavCoins = localStorage.getItem(`${currentUsername}-flavCoins`);

  if (savedClicks && savedExp && savedLevel && savedFlavCoins) {
    clicks = parseInt(savedClicks);
    exp = parseInt(savedExp);
    level = parseInt(savedLevel);
    flavCoins = parseInt(savedFlavCoins);
    updateClickCount();
    updateLevel();
    updateExpBar();
  }
}

loadGameData();
