import { Heroes } from "./data/hero-skills.js";

// const selectedButtons = new Set();
// const warrior = new Heroes();

// export function toggleButton(button) {
//   if (selectedButtons.has(button)) {
//     selectedButtons.delete(button);
//     button.style.backgroundColor = "";
//   } else {
//     selectedButtons.add(button);
//     button.style.backgroundColor = "lightblue";
//   }

//   if (selectedButtons.size >= 4) {
//     const buttons = document.querySelectorAll(".btn");
//     buttons.forEach((btn) => {
//       btn.classList.add("hidden");
//     });
//   }
// }

// let testKlas;
// testKlas = document.querySelector(".test-class").innerHTML =
//   warrior.warrior.skillsList;
// console.log(testKlas);

// const mainButton = document.getElementById("mainButton");
// const buttonList = document.getElementById("buttonList");

// mainButton.addEventListener("click", () => {
//   buttonList.style.display =
//     buttonList.style.display === "none" ? "block" : "none";
// });

// const newButtons = document.querySelectorAll(".newButton");
// newButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     buttonList.style.display = "none";
//   });
// });

// funkcja blokowania przycisków przykład
// const firstButton = document.getElementById("firstButton");
// const secondButton = document.getElementById("secondButton");

// let clickCount = 0;

// firstButton.addEventListener("click", function () {
//   firstButton.disabled = true;
// });

// secondButton.addEventListener("click", function () {
//   clickCount++;

//   if (clickCount === 2) {
//     firstButton.disabled = false;
//     clickCount = 0; // Resetujemy licznik
//   }
// });

// document.getElementById("startButton").onclick = function () {
//   document.getElementById("actionButtons").style.display = "block";
// };

// function attack(type) {
//   const monster = document.getElementById("monster");
//   let damage = 0;

//   // Określenie obrażeń na podstawie wybranego ataku
//   switch (type) {
//     case "fire":
//       damage = 30;
//       break;
//     case "ice":
//       damage = 20;
//       break;
//     case "lightning":
//       damage = 25;
//       break;
//     default:
//       console.log("Nieznany atak");
//   }

//   let currentHp = parseInt(monster.getAttribute("data-hp"));
//   currentHp -= damage;

//   monster.setAttribute("data-hp", currentHp);
//   document.getElementById("hp").innerText = currentHp;

//   if (currentHp <= 0) {
//     alert("Potwór został pokonany!");
//   }
// }

// remove event listener
// const button1 = document.querySelector(".button1");
// const button2 = document.querySelector(".button2");
// const info = document.querySelector(".display");
// const select = document.querySelector(".select");
// let num = 0;
// let tru = false;
// async function selectTarget() {
//   select.addEventListener("click", () => {
//     console.log("czekam");
//     tru = true;
//   });
// }
// function addNum(nums) {
//   num += nums;
// }
// button1.addEventListener("click", async () => {
//   await selectTarget();
//   if (!tru) {
//     return;
//   }
//   addNum(10);
//   info.innerHTML = `tu jest liczba ${num}`;
//   tru = false;
// });
// button2.addEventListener("click", async () => {
//   await selectTarget();
//   addNum(20);
//   info.innerHTML = `tu jest liczba ${num}`;
// });

// function handleAbilityUse(event, abilityName) {
//   switch (abilityName) {
//     case "warrior-normal-attack":
//       createAbilityManaPlus(
//         event,
//         "warrior-normal-attack",
//         15,
//         20,
//         "normal attack",
//         1.7,
//         null,
//         10
//       );
//       break;
//     case "warrior-strong-attack":
//       createAbilityManaPlus(
//         event,
//         "warrior-strong-attack",
//         20,
//         30,
//         "strong attack",
//         1.7,
//         null,
//         5
//       );
//       break;
//     case "spear-stab":
//       createAbilitySkill(
//         event,
//         "spear-stab",
//         30,
//         45,
//         "spear stab",
//         8,
//         1.7,
//         null
//       );
//       break;
//     case "enrage-attack":
//       createAbilitySkill(event, "enrage", 50, 70, "enrage", 15, 1.7, null);
//       break;
//     case "leap-attack":
//       createAbilitySkill(event, "leap", 70, 100, "leap", 22, 1.7, null);
//       break;
//     case "brutal-takedown":
//       createAbilitySkill(
//         event,
//         "brutal-takedown",
//         150,
//         300,
//         "brutal takedown",
//         40,
//         1.7,
//         null
//       );
//       break;
//     default:
//       console.log("Nieznana umiejętność");
//   }
// }

// funkcja zajmująca się by dany event wykonał się raz, usunął event listener i po wykonaniu dodał spowrotem
function once(eventName) {
  return new Promise((resolve) => {
    const element = document.querySelector(".target");
    const listener = (event) => {
      element.removeEventListener(eventName, listener);
      resolve(event);
    };
    element.addEventListener(eventName, listener);
  });
}

// funkcja select target po przerobieniach do "nowej" wersji
async function selectTarget() {
  return new Promise(async (resolve) => {
    const targetButtons = document.querySelectorAll(".target");
    console.log(checkAttack, "checkAttack przed sprawdzeniem w selectTarget");
    console.log(
      currentAttack,
      "currentAttack przed sprawdzeniem w selectTarget"
    );
    showSelectTarget();

    const targetEvent = await once("click");
    selectedTarget = targetEvent.target.getAttribute("data-target");

    console.log(checkAttack, "check po wyborze celu");
    console.log(currentAttack, "current po wyborze celu");

    resolve(selectedTarget);
  });
}

// funkcja interakcji zajmująca się wykonaniem ataku
async function interaction() {
  while (true) {
    const attackKind = await selectAttackKind();
    console.log("Wybrano atak:", attackKind);

    const target = await selectTarget();
    console.log("Wybrano cel:", target);

    await executeAttack(attackKind, target);
  }
}

// funkcja  zajmująca się wybraniem rodzaju ataku
async function selectAttackKind() {
  return new Promise((resolve) => {
    const attackButtons = document.querySelectorAll(".js-skills");
    attackButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const abilityName = event.target.getAttribute("data-skill");
        resolve(abilityName);
      });
    });
  });
}

// funkcja zajmująca się wykonaniem ataku
async function executeAttack(attackKind, target, attackName) {
  switch (attackName) {
    case "warrior-normal-attack":
      await createAbilityManaPlus(
        null,
        "warrior-normal-attack",
        15,
        20,
        "normal attack",
        1.7,
        null,
        10,
        abilityName
      );
      break;

    case "warrior-strong-attack":
      await createAbilityManaPlus(
        null,
        "warrior-strong-attack",
        20,
        30,
        "strong attack",
        1.7,
        null,
        5,
        abilityName
      );
      break;

    default:
      console.log("Nieobsługiwany atak:", attackName);
  }
}

// funcja selectTarget z AbortController
async function selectTarget() {
  showSelectTarget();
  let isSelecting = true;
  let abort = new AbortController();
  new Promise(async (resolve, reject) => {
    while (isSelecting) {
      if (waitSelecting) {
        console.log("jest kliknięcie");
        waitSelecting = false;
        isSelecting = false;
        currentAttack = null;
        checkAttack = null;
        heroContainer.removeEventListener("click", handleClick);
        heroContainer.addEventListener("click", handleClick);
        abort.abort();
        hideSelectTarget();
        reject(selectTarget);
        break;
      } else if (!waitSelecting) {
        resolve((waitSelecting = true));
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  });

  return new Promise((resolve) => {
    const targetButtons = document.querySelectorAll(".target");

    targetButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        selectedTarget = event.target.getAttribute("data-target");
        isSelecting = false;
        resolve(selectedTarget);
      });
    });
  });
}

// funkcja do obsługi umiejętności
async function handleAbilityUse(event, abilityName) {
  switch (abilityName) {
    //warrior
    case "warrior-normal-attack":
      currentAttack = "warrior-normal";
      checkAttack = "warrior-normal";
      await interaction();
      break;
    case "warrior-strong-attack":
      currentAttack = "warrior-strong";
      checkAttack = "warrior-strong";
      await interaction();
      break;
    case "spear-stab":
      createAbilitySkill(
        event,
        "spear-stab",
        30,
        45,
        "spear stab",
        8,
        1.7,
        null
      );
      break;
    case "enrage":
      createAbilitySkill(event, "enrage", 50, 70, "enrage", 15, 1.7, null);
      break;
    case "leap":
      createAbilitySkill(event, "leap", 70, 100, "leap", 22, 1.7, null);
      break;
    case "brutal-takedown":
      createAbilitySkill(
        event,
        "brutal-takedown",
        150,
        300,
        "brutal takedown",
        40,
        1.7,
        null
      );
      break;
    //sorcerer
    case "sorcerer-normal-attack":
      createAbilityManaPlus(
        event,
        "sorcerer-normal-attack",
        3,
        8,
        "normal attack",
        null,
        null,
        2
      );
      break;
    case "sorcerer-fire-magic":
      createAbilityMagic(
        event,
        "sorcerer-fire-magic",
        20,
        40,
        "fire",
        10,
        null,
        "fire",
        "fire-type"
      );
      break;
    case "sorcerer-fira-magic":
      createAbilityMagicAOE(
        event,
        "sorcerer-fira-magic",
        45,
        60,
        "Fira",
        18,
        "fire",
        "fire-type",
        "fire",
        "fireT"
      );
      break;
    case "sorcerer-firaga-magic":
      createAbilityMagicAOE(
        event,
        "sorcerer-firaga-magic",
        70,
        120,
        "Firaga",
        25,
        "fire",
        "fire-type",
        "fire",
        "fireT"
      );
    case "sorcerer-blizzard-magic":
      createAbilityMagic(
        event,
        "sorcerer-blizzard-magic",
        20,
        40,
        "ice",
        10,
        null,
        "ice",
        "ice-type"
      );
      break;
    case "sorcerer-blizzara-magic":
      createAbilityMagicAOE(
        event,
        "sorcerer-blizzara-magic",
        45,
        60,
        "Blizzara",
        18,
        "ice",
        "ice-type",
        "ice",
        "iceT"
      );
      break;
    case "sorcerer-blizzaga-magic":
      createAbilityMagicAOE(
        event,
        "sorcerer-blizzaga-magic",
        70,
        120,
        "Blizzaga",
        25,
        "ice",
        "ice-type",
        "ice",
        "iceT"
      );
      break;
    case "sorcerer-thunder-magic":
      createAbilityMagic(
        event,
        "sorcerer-thunder-magic",
        20,
        40,
        "thunder",
        10,
        null,
        "thunder",
        "thunder-type"
      );
      break;
    case "sorcerer-thundara-magic":
      createAbilityMagicAOE(
        event,
        "sorcerer-thundara-magic",
        45,
        60,
        "Thundara",
        18,
        "thunder",
        "thunder-type",
        "thunder",
        "thunderT"
      );
      break;
    case "sorcerer-thundaga-magic":
      createAbilityMagicAOE(
        event,
        "sorcerer-thundaga-magic",
        70,
        120,
        "Thundaga",
        25,
        "thunder",
        "thunder-type",
        "thunder",
        "thunderT"
      );
      break;
    case "sorcerer-gravity-magic":
      createAbilityMagic(
        event,
        "sorcerer-gravity-magic",
        70,
        110,
        "magic",
        50,
        null,
        "magic",
        "magic-type"
      );
      break;
    case "sorcerer-graviga-magic":
      createAbilityMagicAOE(
        event,
        "sorcerer-graviga-magic",
        150,
        300,
        "Graviga",
        100,
        "magic",
        "magic-type",
        "magic",
        "magicT"
      );
      break;
    //spellblade
    default:
      console.log("Nieznana umiejętność");
  }

  // kod zajmujący się wyszukaniem odpowiedniego przycisku
  const heroContainer = document.getElementById("hero-container");
  heroContainer.addEventListener("click", async (event) => {
    if (event.target && event.target.matches(".js-skills")) {
      const abilityName = event.target.getAttribute("data-skill");
      if (checkAttack !== currentAttack) {
        checkAttack = currentAttack;
      }
      await handleAbilityUse(event, abilityName);
    }
  });
  // setupAbilityClickListener();
}
