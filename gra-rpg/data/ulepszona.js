import { heroes } from "./heroes.js";
import { Heroes } from "./hero-skills.js";
import { calculateDmg, healingSpells } from "./skills-magic.js";
import { monsterWeakness } from "./monster-data.js";

const addHeroButton = document.querySelectorAll(".btn");
const selectedButtons = new Set();
const playerSection = document.querySelector(".js-player-placement");
const heroInstance = new Heroes();
const holyKnightHp = document.querySelector(".knight-hp");
const crucibleKnightHp = document.querySelector(".crucible-hp");
const dragonHp = document.querySelector(".dragon-hp");
const otherSkills4 = document.querySelectorAll(".unlock-blocked4");
let targetButtons = document.querySelectorAll(".hero-select");

let waitingTarget = false;
let isAbilityInUse = false;
let areListenersAdded = false;
let hkHp = 3000;
let ckHp = 5000;
let drgHp = 9999;
let buffStats = false;
let buffEnhance = false;
let turnCountHealer = 2;
let turnCountSorcerer = 2;
let turnCountDruid = 2;
let turnCountSpellblade = 2;
let weaknessCount = 2;
const playerNumber = {
  player1: document.getElementById("player-1"),
  player2: document.getElementById("player-2"),
  player3: document.getElementById("player-3"),
  player4: document.getElementById("player-4"),
};

let currentPlayerIndex = 0;

function addHero(heroId) {
  const selectedHero = heroes.find((hero) => hero.id === heroId);

  let skillsHTML = "";
  if (selectedHero.id === "wrw") {
    skillsHTML = heroInstance.warrior.skillsList;
  } else if (selectedHero.id === "dfd") {
    skillsHTML = heroInstance.defender.skillsList;
  } else if (selectedHero.id === "hlr") {
    skillsHTML = heroInstance.healer.skillsList;
  } else if (selectedHero.id === "srcr") {
    skillsHTML = heroInstance.sorcerer.skillsList;
  } else if (selectedHero.id === "sbb") {
    skillsHTML = heroInstance.spellblade.skillsList;
  } else if (selectedHero.id === "drd") {
    skillsHTML = heroInstance.druid.skillsList;
  } else if (selectedHero.id === "alh") {
    skillsHTML = heroInstance.alchemist.skillsList;
  } else if (selectedHero.id === "elm") {
    skillsHTML = heroInstance.elementalMaster.skillsList;
  }

  let magicHTML = "";
  if (selectedHero.id === "wrw") {
    magicHTML = heroInstance.warrior.magicList;
  } else if (selectedHero.id === "dfd") {
    magicHTML = heroInstance.defender.magicList;
  } else if (selectedHero.id === "hlr") {
    magicHTML = heroInstance.healer.magicList;
  } else if (selectedHero.id === "srcr") {
    magicHTML = heroInstance.sorcerer.magicList;
  } else if (selectedHero.id === "sbb") {
    magicHTML = heroInstance.spellblade.magicList;
  } else if (selectedHero.id === "drd") {
    magicHTML = heroInstance.druid.magicList;
  } else if (selectedHero.id === "alh") {
    magicHTML = heroInstance.alchemist.magicList;
  } else if (selectedHero.id === "elm") {
    magicHTML = heroInstance.elementalMaster.magicList;
  }

  let focusHTML = "";
  if (selectedHero.id === "wrw") {
    focusHTML = heroInstance.warrior.focusButton;
  } else if (selectedHero.id === "dfd") {
    focusHTML = heroInstance.defender.focusButton;
  } else if (selectedHero.id === "hlr") {
    focusHTML = heroInstance.healer.focusButton;
  } else if (selectedHero.id === "srcr") {
    focusHTML = heroInstance.sorcerer.focusButton;
  } else if (selectedHero.id === "sbb") {
    focusHTML = heroInstance.spellblade.focusButton;
  } else if (selectedHero.id === "drd") {
    focusHTML = heroInstance.druid.focusButton;
  } else if (selectedHero.id === "alh") {
    focusHTML = heroInstance.alchemist.focusButton;
  } else if (selectedHero.id === "elm") {
    focusHTML = heroInstance.elementalMaster.focusButton;
  }

  if (selectedHero) {
    const playerHtml = `
      <div class="player-block hero-img" data-hero-id="${selectedHero.id}" style="background-image: url('${selectedHero.img}')">
        <p>${selectedHero.name}</p>
        <div>
          <p class="hp-amount">HP: ${selectedHero.hp}</p>
          <p class="mp-amount">MP: ${selectedHero.mp}</p>
        </div>
        <div class="ability-buttons">
          <div class="ability-section">
            <div class="focus-hover-placement focus-placement">
             ${focusHTML}
             <p class="hidden-info">Focus your mind to regain mana MP + 25</p>
            </div>
          </div>
          <div class="ability-section skills-ability-section">
            <button class="all-buttons js-skills-button">Skills</button>
            <div class="new-skills-button hidden js-new-skills-button">${skillsHTML}</div>
          </div>
          <div class="ability-section magic-ability-section">
            <button class="all-buttons js-magic-button">Magic</button>
            <div class="new-magic-button hidden js-new-magic-button">${magicHTML}</div>
          </div>
        </div>
      </div>
    `;
    playerSection.insertAdjacentHTML("beforeend", playerHtml);
    if (currentPlayerIndex < Object.keys(playerNumber).length) {
      playerNumber[`player${currentPlayerIndex + 1}`] = selectedHero;
      currentPlayerIndex++;
    } else {
      console.log("Wszyscy gracze są już zajęci!");
    }

    const skillsButton = playerSection.querySelector(
      `.player-block[data-hero-id="${selectedHero.id}"] .skills-ability-section`
    );
    const addSkillsList = playerSection.querySelector(
      `.player-block[data-hero-id="${selectedHero.id}"] .js-new-skills-button`
    );
    const magicButton = playerSection.querySelector(
      `.player-block[data-hero-id="${selectedHero.id}"] .magic-ability-section`
    );
    const addMagicList = playerSection.querySelector(
      `.player-block[data-hero-id="${selectedHero.id}"] .js-new-magic-button`
    );
    const addfocusButton = playerSection.querySelector(
      `.player-block[data-hero-id="${selectedHero.id}"] .focus-placement`
    );

    skillsButton.addEventListener("click", () => {
      addSkillsList.classList.toggle("hidden");
      if (!addMagicList.classList.contains("hidden")) {
        addMagicList.classList.add("hidden");
      }
    });

    magicButton.addEventListener("click", () => {
      addMagicList.classList.toggle("hidden");
      if (!addSkillsList.classList.contains("hidden")) {
        addSkillsList.classList.add("hidden");
      }
    });

    // Zestaw umiejętności Warrior
    ////////////////
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      focusAbility(event, "warrior-focus");
    });

    //////////////
    // normal attack

    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "warrior-normal-attack",
        15,
        20,
        "normal attack",
        1.7,
        null,
        10
      );
      isAbilityInUse = false;
    });

    //////////////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "warrior-strong-attack",
        20,
        30,
        "strong attack",
        1.7,
        null,
        5
      );
      isAbilityInUse = false;
    });

    ////////////////
    // Spear stab
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilitySkill(
        event,
        "spear-stab",
        30,
        45,
        "spear stab",
        8,
        1.7,
        null
      );
      isAbilityInUse = false;
    });

    ////////////////////
    // Enrage
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilitySkill(
        event,
        "enrage",
        50,
        70,
        "enrage",
        15,
        1.7,
        null
      );
      isAbilityInUse = false;
    });

    ///////////////
    // Leap
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilitySkill(event, "leap", 70, 100, "leap", 22, 1.7, null);
      isAbilityInUse = false;
    });

    //////////////////
    // Brutal takedown
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilitySkill(
        event,
        "brutal-takedown",
        150,
        300,
        "brutal takedown",
        40,
        1.7,
        null
      );
      isAbilityInUse = false;
    });

    /////////////////
    // Dmg boost
    addMagicList.addEventListener("click", (event) => {
      if (event.target.classList.contains("dmg-boost")) {
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 30) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 30;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        BuffMagic();

        info.innerHTML = `${hero.name} used Dmg boost increasing his power!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
      }
    });
    ///////////////////////
    ///////////////////////
    // Zestaw umiejętności Sorcerer
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      focusAbility(event, "sorcerer-focus");
    });

    //////////////
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      // console.log("Kolejne użycie");
      // console.log(waitingTarget, "waiting target przed logika");
      if (isAbilityInUse) {
        return;
      }
      // console.log(isAbilityInUse, "ability in use przed zmianą");
      isAbilityInUse = true;
      // console.log(isAbilityInUse, "ability in use po zmianą");
      await createAbilityManaPlus(
        event,
        "sorcerer-normal-attack",
        3,
        8,
        "normal attack",
        null,
        null,
        2
      );
      // console.log("po użyciu createAbility");
      // console.log(waitingTarget, "waiting target przed unlock");
      if (waitingTarget) {
        unlockSorcerer(turnCountSorcerer);
        // console.log(waitingTarget, "waiting target w trakcie unlock");
      }
      waitingTarget = false;
      isAbilityInUse = false;
      // console.log(waitingTarget, "waiting target po unlock");
    });
    //////////////
    // energy gathering
    addSkillsList.addEventListener("click", (event) => {
      regenMana(event, "energy-gathering", "Energy gathering", 60);
    });

    //////////////
    // fire
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
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
      isAbilityInUse = false;
    });
    ///////////////
    // Fira
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
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
      isAbilityInUse = false;
    });

    ////////////
    // Firaga
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
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
      isAbilityInUse = false;
    });

    ///////////
    // Blizzard
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
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
      isAbilityInUse = false;
    });

    /////////////
    // Blizzara
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
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
      isAbilityInUse = false;
    });

    /////////
    // Blizzaga
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
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
      isAbilityInUse = false;
    });

    ///////////
    // Thunder
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
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
      isAbilityInUse = false;
    });

    ///////////
    // Thundara
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
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
      isAbilityInUse = false;
    });

    ///////////
    // Thundaga
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
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
      isAbilityInUse = false;
    });

    ////////////
    // Gravity
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
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
      isAbilityInUse = false;
    });

    ///////////
    // Graviga
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
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
      isAbilityInUse = false;
    });

    ///////////
    // Zestaw skilli Spellblade
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      focusAbility(event, "spellblade-focus");
    });
    /////////
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "spellblade-normal-attack",
        15,
        18,
        "normal attack",
        null,
        1.4,
        10
      );
      isAbilityInUse = false;
    });

    //////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "spellblade-strong-attack",
        18,
        24,
        "strong attack",
        null,
        1.4,
        5
      );
      isAbilityInUse = false;
    });

    ////////////
    // Meditate
    addSkillsList.addEventListener("click", (event) => {
      regenMana(event, "meditate", "Meditate", 40);
    });

    //////////
    // Weakness fire
    addSkillsList.addEventListener("click", async (event) => {
      createAbilityImplant(
        event,
        "implant-fire",
        40,
        "Weakness fire",
        "fireWeakness", //element
        "fireTougtness", //element2
        "fire",
        "fire-type"
      );
    });

    //////////
    // Weakness ice
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("implant-ice")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetWeakness = selectMonsterWeakness(selectedTarget);

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);
        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 40) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 40;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }
        const weaknessTurnCount = document.querySelectorAll(".reduce-wCount");

        if (
          targetWeakness.iceTougtness === true &&
          targetWeakness.iceWeakness === false
        ) {
          targetWeakness.iceWeakness = true;
          targetWeakness.iceTougtness = false;
        } else if (targetWeakness.iceTougtness === false) {
          info.innerHTML = "Its no effective";
          info.style.opacity = "1";
          setTimeout(() => {
            info.style.opacity = "0";
          }, 2000);
          return;
        }

        weaknessTurnCount.forEach((weaknessTurn) => {
          weaknessTurn.addEventListener("click", () => {
            if (
              weaknessTurn.classList.contains("reduce-wCount") &&
              weaknessCount > 0
            ) {
              weaknessCount--;
            } else if (weaknessCount === 0) {
              targetWeakness.iceTougtness = true;
              targetWeakness.iceWeakness = false;
              weaknessCount = 2;
            }
          });
        });

        info.innerHTML = `${hero.name} used Weakness ice implanting <span class="ice-type">ice</span> weakness`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
        hideSelectTarget();
      }
    });

    //////////
    // Enhance
    addSkillsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("enhance")) {
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 20) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 20;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        BuffMagic2();

        info.innerHTML = `${hero.name} used Enhance increasing her power!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
      }
    });

    ////////////
    // Flame slash
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "flame-slash",
        35,
        50,
        "fire",
        15,
        null,
        "fire",
        "fire-type",
        1.4
      );
      isAbilityInUse = false;
    });

    ////////////
    // Ice slash
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "ice-slash",
        35,
        50,
        "ice",
        15,
        null,
        "ice",
        "ice-type",
        1.4
      );
      isAbilityInUse = false;
    });

    ////////////
    // Elemental dance
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicMulti(
        event,
        "elemental-dance",
        50,
        80,
        "Elemental Dance",
        30,
        buffEnhance,
        "fire",
        "ice",
        "fire-type",
        "ice-type",
        1.4
      );
      isAbilityInUse = false;
    });

    ////////////
    // Fire Tornado
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "fire-tornado",
        50,
        80,
        "fire",
        25,
        null,
        "fire",
        "fire-type",
        1.4
      );
      isAbilityInUse = false;
    });

    ////////////
    // Ice Tornado
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "ice-tornado",
        50,
        80,
        "ice",
        25,
        null,
        "ice",
        "ice-type",
        1.4
      );
      isAbilityInUse = false;
    });

    ////////////
    // Elemental tornado
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicMulti(
        event,
        "elemental-tornado",
        120,
        250,
        "Elemental Tornado",
        50,
        buffEnhance,
        "fire",
        "ice",
        "fire-type",
        "ice-type",
        1.4
      );
      isAbilityInUse = false;
    });

    ///////////
    // Zestaw umiejętności Druid
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      focusAbility(event, "druid-focus");
    });
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "druid-normal-attack",
        10,
        18,
        "normal attack",
        null,
        null,
        8
      );
      isAbilityInUse = false;
    });

    //////////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "druid-strong-attack",
        15,
        22,
        "strong attack",
        null,
        null,
        6
      );
      isAbilityInUse = false;
    });

    //////////////
    // Thorns
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilitySkill(
        event,
        "thorns",
        30,
        40,
        "thorns",
        5,
        null,
        null
      );
      isAbilityInUse = false;
    });

    //////////////
    // mana seed
    addSkillsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("mana-seed")) {
        if (event.target.classList.contains("mana-seed")) {
          if (event.target.classList.contains("disabled")) {
            return;
          }
        }

        const allHeroes = document.querySelectorAll(".player-block");
        let infoHeroName = "";
        allHeroes.forEach((heroBlock) => {
          const heroId = heroBlock.getAttribute("data-hero-id");
          const heroMPElement = heroBlock.querySelector(".mp-amount");

          const hero = heroes.find((hero) => hero.id === heroId);

          if (hero) {
            hero.mp += 35;

            if (hero.mp > hero.maxMp) {
              hero.mp = hero.maxMp;
            }

            heroMPElement.textContent = `MP: ${hero.mp}`;
            if (!infoHeroName) {
              infoHeroName = "Druid";
            }
          }
        });

        let info = document.querySelector(".info-display");
        info.innerHTML = `${infoHeroName} used Mana Seed recovering mana to all!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
        const disable = document.querySelector(".mana-seed");
        disable.classList.add("disabled");
      }
    });

    ////////////
    // cure
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityHeal(event, "druid-cure", 15, 30, 50, "Cure");
      isAbilityInUse = false;
    });

    ////////////
    // curaja
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityHealAOE(event, "druid-curaja", 50, 80, 110, "Curaja");
      isAbilityInUse = false;
    });

    ///////////
    // stone
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "stone",
        20,
        40,
        "Stone",
        10,
        null,
        "earth",
        "earth-type"
      );
      isAbilityInUse = false;
    });
    ///////////
    // stona
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
        event,
        "stona",
        45,
        60,
        "Stona",
        18,
        "earth",
        "earth-type",
        "earth",
        "earthT"
      );
      isAbilityInUse = false;
    });
    ///////////
    // stonga
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
        event,
        "stonga",
        70,
        120,
        "Stonga",
        25,
        "earth",
        "earth-type",
        "earth",
        "earthT"
      );
      isAbilityInUse = false;
    });
    ///////////
    // aero
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "aero",
        20,
        40,
        "Aero",
        10,
        null,
        "wind",
        "wind-type"
      );
      isAbilityInUse = false;
    });
    ///////////
    // aerora
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
        event,
        "aerora",
        45,
        60,
        "Aerora",
        18,
        "wind",
        "wind-type",
        "wind",
        "windT"
      );
      isAbilityInUse = false;
    });
    ///////////
    // aeroga
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOE(
        event,
        "aeroga",
        70,
        120,
        "Aeroga",
        25,
        "wind",
        "wind-type",
        "wind",
        "windT"
      );
      isAbilityInUse = false;
    });
    //////////
    // forest revenge
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOEMulti(
        event,
        "forest-revenge",
        175,
        300,
        "Forest revenge",
        70,
        "earth",
        "wind",
        "earth-type",
        "wind-type",
        "earth",
        "wind",
        "earthT",
        "windT"
      );
      isAbilityInUse = false;
    });

    ///////////
    // zestaw umiejętności healer
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      focusAbility(event, "healer-focus");
    });
    ///////////
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "healer-normal-attack",
        5,
        10,
        "normal attack",
        null,
        null,
        5
      );
      isAbilityInUse = false;
    });

    ///////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "healer-strong-attack",
        8,
        15,
        "strong attack",
        null,
        null,
        2
      );
      isAbilityInUse = false;
    });
    ///////////
    // pray
    addSkillsList.addEventListener("click", (event) => {
      regenMana(event, "pray", "Pray", 50);
    });
    ////////////
    // cure
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityHeal(event, "healer-cure", 15, 30, 50, "Cure");
      isAbilityInUse = false;
    });
    ////////////
    // cura
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityHealAOE(event, "healer-cura", 30, 40, 60, "Cura");
      isAbilityInUse = false;
    });
    ////////////
    // curaga
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityHeal(event, "healer-curaga", 45, 100, 150, "Curaga");
      isAbilityInUse = false;
    });
    ////////////
    // curaja
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityHealAOE(event, "healer-curaja", 50, 80, 100, "Curaja");
      isAbilityInUse = false;
    });
    ///////////
    // light arrow
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "light-arrow",
        30,
        60,
        "Light arrow",
        10,
        null,
        "magic",
        "magic-type"
      );
      isAbilityInUse = false;
    });
    ///////////
    // holy
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "holy",
        400,
        400,
        "Holy",
        100,
        null,
        "magic",
        "magic-type"
      );
      isAbilityInUse = false;
    });
    ///////////
    // mana transfer
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaTransfer(
        event,
        "mana-transfer",
        30,
        "Mana transfer"
      );
      isAbilityInUse = false;
    });
    ///////////
    // zestaw umiejętności Elemental master
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      focusAbility(event, "elementalMaster-focus");
    });
    ///////////
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "elementalMaster-normal-attack",
        10,
        15,
        "normal attack",
        null,
        null,
        10
      );
      isAbilityInUse = false;
    });
    ///////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityManaPlus(
        event,
        "elementalMaster-strong-attack",
        15,
        20,
        "strong attack",
        null,
        null,
        5
      );
      isAbilityInUse = false;
    });
    ///////////
    // absorb element
    addSkillsList.addEventListener("click", (event) => {
      regenMana(event, "absorb-elements", "Absorb elements", 50);
    });
    //////////
    // blazing wind
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOEMulti(
        event,
        "blazing-wind",
        50,
        80,
        "Blazing wind",
        30,
        "fire",
        "wind",
        "fire-type",
        "wind-type",
        "fire",
        "wind",
        "fireT",
        "windT"
      );
      isAbilityInUse = false;
    });
    //////////
    // hard blast
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOEMulti(
        event,
        "hard-blast",
        50,
        80,
        "Hard blast",
        30,
        "earth",
        "magic",
        "earth-type",
        "magic-type",
        "earth",
        "magic",
        "earthT",
        "magicT"
      );
      isAbilityInUse = false;
    });
    //////////
    // freezing spark
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOEMulti(
        event,
        "freezing-spark",
        50,
        80,
        "Freezing spark",
        30,
        "ice",
        "thunder",
        "ice-type",
        "thunder-type",
        "ice",
        "thunder",
        "iceT",
        "thunderT"
      );
      isAbilityInUse = false;
    });
    //////////
    // cold snap
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOEMulti(
        event,
        "cold-snap",
        100,
        120,
        "Cold snap",
        45,
        "ice",
        "magic",
        "ice-type",
        "magic-type",
        "ice",
        "magic",
        "iceT",
        "magicT"
      );
      isAbilityInUse = false;
    });
    //////////
    // lava earthquake
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOEMulti(
        event,
        "lava-earthquake",
        100,
        120,
        "Lava earthquake",
        45,
        "fire",
        "earth",
        "fire-type",
        "earth-type",
        "fire",
        "earth",
        "fireT",
        "earthT"
      );
      isAbilityInUse = false;
    });
    //////////
    // geo storm
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagicAOEMulti(
        event,
        "geo-storm",
        100,
        120,
        "Geo storm",
        45,
        "thunder",
        "wind",
        "thunder-type",
        "wind-type",
        "thunder",
        "wind",
        "thunderT",
        "windT"
      );
      isAbilityInUse = false;
    });
    ///////////
    // all in me
    addMagicList.addEventListener("click", async (event) => {
      if (isAbilityInUse) {
        return;
      }
      isAbilityInUse = true;
      await createAbilityMagic(
        event,
        "all-in-me",
        1000,
        1000,
        "All in me!",
        200,
        null,
        "magic",
        "magic-type"
      );
      const playerBlock = event.target.closest(".player-block");
      const heroId = playerBlock.getAttribute("data-hero-id");
      const hero = heroes.find((hero) => hero.id === heroId);
      const heroHPElement = playerBlock.querySelector(".hp-amount");
      hero.hp -= hero.maxHp;
      if (hero.hp <= 0) {
        hero.hp = 1;
      }
      heroHPElement.innerHTML = `HP: ${hero.hp}`;

      isAbilityInUse = false;
    });

    /////////////
    // koniec umiejętności bohaterów

    /////////////
    // focus listener
    function focusAbility(event, selector) {
      if (event.target.classList.contains(selector)) {
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        let info = document.querySelector(".info-display");
        const hero = heroes.find((hero) => hero.id === heroId);
        if (hero.mp === hero.maxMp) {
          checkMana(hero, info);
          return;
        }
        gainMana(25, hero, heroMPElement);
        showInfoFocus(info, hero);
      }
    }

    /////////////
    // event listener mana+
    async function createAbilityManaPlus(
      event,
      selector,
      minDamage,
      maxDamage,
      infoDisplay,
      buffRatio,
      buffEnhance,
      mp
    ) {
      if (event.target.classList.contains(selector)) {
        const selected = await selectTarget();

        if (!selected) {
          waitingTarget = false;
          return;
        }

        let targetElement = selectMonster(selectedTarget);
        let playerDmg = calculateDmg(minDamage, maxDamage);
        if (buffRatio === null) {
        } else if (buffStats === true) {
          playerDmg = Math.round((playerDmg *= buffRatio));
          buffStats = false;
        }
        if (buffEnhance === null) {
        } else if (buffEnhance === true) {
          playerDmg = Math.round((playerDmg *= enhanceBuff));
          buffEnhance = false;
        }

        reduceHp(selectedTarget, targetElement, playerDmg);
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        gainMana(mp, hero, heroMPElement);
        showInfo(playerDmg, hero, infoDisplay);
        waitingTarget = true;
        hideSelectTarget();
      }
    }

    /////////////
    // event listener mana regen
    function regenMana(event, selector, infoDisplay, mp) {
      if (event.target.classList.contains(selector)) {
        if (event.target.classList.contains(selector)) {
          if (event.target.classList.contains("disabled")) {
            return;
          }
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);
        gainMana(mp, hero, heroMPElement);

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used ${infoDisplay} to recover mana!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
        const disable = document.querySelector(`.${selector}`);
        disable.classList.add("disabled");
      }
    }

    /////////////
    // listener skile
    async function createAbilitySkill(
      event,
      selector,
      minDamage,
      maxDamage,
      infoDisplay,
      mp,
      buffRatio,
      buffEnhance
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTarget();

        if (!selectTarget) {
          waitingTarget = false;
          return;
        }
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }

        let targetElement = selectMonster(selectedTarget);
        let playerDmg = calculateDmg(minDamage, maxDamage);
        if (buffRatio === null) {
        } else if (buffStats === true) {
          playerDmg = Math.round((playerDmg *= buffRatio));
          buffStats = false;
        }
        if (buffEnhance === null) {
        } else if (buffEnhance === true) {
          playerDmg = Math.round((playerDmg *= enhanceBuff));
          buffEnhance = false;
        }

        reduceHp(selectedTarget, targetElement, playerDmg);
        showInfo(playerDmg, hero, infoDisplay);
        waitingTarget = true;
        hideSelectTarget();
      }
    }

    ////////////
    // listener magia
    async function createAbilityMagic(
      event,
      selector,
      minDamage,
      maxDamage,
      infoDisplay,
      mp,
      buffEnhance,
      elementType,
      elementColor,
      enhanceBuff
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTarget();

        if (!selectTarget) {
          waitingTarget = false;
          return;
        }
        let targetElement = selectMonster(selectedTarget);
        let targetWeakness = selectMonsterWeakness(selectedTarget);

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }

        let playerDmg = calculateDmg(minDamage, maxDamage);
        let finalDmg = playerDmg;
        if (buffEnhance === null) {
        } else if (buffEnhance === true) {
          finalDmg = Math.round((playerDmg *= enhanceBuff));
          buffEnhance = false;
        }

        finalDmg = weaknessCheck(targetWeakness, finalDmg, elementType);
        reduceHpMagic(selectedTarget, targetElement, finalDmg);
        showMagicInfo(finalDmg, hero, infoDisplay, elementType, elementColor);
        waitingTarget = true;
        hideSelectTarget();
      }
    }

    /////////////
    // listener magia multi element
    async function createAbilityMagicMulti(
      event,
      selector,
      minDamage,
      maxDamage,
      infoDisplay,
      mp,
      buffEnhance,
      elementType,
      elementType2,
      elementColor,
      elementColor2,
      enhanceBuff
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTarget();

        if (!selectTarget) {
          waitingTarget = false;
          return;
        }
        let targetElement = selectMonster(selectedTarget);
        let targetWeakness = selectMonsterWeakness(selectedTarget);

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }

        let playerDmg = calculateDmg(minDamage, maxDamage);
        let finalDmg = playerDmg;
        if (buffEnhance === null) {
        } else if (buffEnhance === true) {
          finalDmg = Math.round((playerDmg *= enhanceBuff));
          buffEnhance = false;
        }
        finalDmg = weaknessCheckMulti(
          targetWeakness,
          finalDmg,
          elementType,
          elementType2
        );
        reduceHpMagic(selectedTarget, targetElement, finalDmg);
        showMagicInfoMulti(
          finalDmg,
          hero,
          infoDisplay,
          elementType,
          elementType2,
          elementColor,
          elementColor2
        );
        waitingTarget = true;
        hideSelectTarget();
      }
    }
    /////////////
    // listener magia aoe
    async function createAbilityMagicAOE(
      event,
      selector,
      minDamage,
      maxDamage,
      infoDisplay,
      mp,
      elementType,
      elementColor,
      weaknessType,
      weaknessType2
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTargetAoe();
        if (!selectedTargets) {
          waitingTarget = false;
          return;
        }
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }
        const selectWeakness = selectMonsterWeaknessAoe(selectedTargets);
        let playerDmg = calculateDmg(minDamage, maxDamage);
        let finalDmg = playerDmg;
        let crucibleDmg;
        let knightDmg;
        let dragonDmg;

        knightDmg = weaknessCheckHolyKnight(
          selectWeakness,
          finalDmg,
          weaknessType,
          weaknessType2,
          "holyKnight"
        );
        dragonDmg = weaknessCheckDragon(
          selectWeakness,
          finalDmg,
          weaknessType,
          weaknessType2,
          "ancientDragon"
        );
        crucibleDmg = weaknessCheckCrucible(
          selectWeakness,
          finalDmg,
          weaknessType,
          weaknessType2,
          "crucibleKnight"
        );

        reduceHpAOE(knightDmg, dragonDmg, crucibleDmg);
        showMagicInfoAOE(
          knightDmg,
          crucibleDmg,
          dragonDmg,
          hero,
          infoDisplay,
          elementType,
          elementColor
        );
        waitingTarget = true;
        hideSelectTargetAOE();
      }
    }
    /////////////
    // listener magia aoe multi
    async function createAbilityMagicAOEMulti(
      event,
      selector,
      minDamage,
      maxDamage,
      infoDisplay,
      mp,
      elementType1,
      elementType2,
      elementColor1,
      elementColor2,
      weaknessType,
      weaknessType2,
      weaknessType3,
      weaknessType4
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTargetAoe();
        if (!selectedTargets) {
          waitingTarget = false;
          return;
        }
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }
        const selectWeakness = selectMonsterWeaknessAoe(selectedTargets);
        let playerDmg = calculateDmg(minDamage, maxDamage);
        let finalDmg = playerDmg;
        let crucibleDmg;
        let knightDmg;
        let dragonDmg;

        knightDmg = weaknessCheckHolyKnightMulti(
          selectWeakness,
          finalDmg,
          weaknessType,
          weaknessType2,
          weaknessType3,
          weaknessType4,
          "holyKnight"
        );
        dragonDmg = weaknessCheckDragonMulti(
          selectWeakness,
          finalDmg,
          weaknessType,
          weaknessType2,
          weaknessType3,
          weaknessType4,
          "ancientDragon"
        );
        crucibleDmg = weaknessCheckCrucibleMulti(
          selectWeakness,
          finalDmg,
          weaknessType,
          weaknessType2,
          weaknessType3,
          weaknessType4,
          "crucibleKnight"
        );

        reduceHpAOE(knightDmg, dragonDmg, crucibleDmg);
        showMagicInfoAOEMulti(
          knightDmg,
          crucibleDmg,
          dragonDmg,
          hero,
          infoDisplay,
          elementType1,
          elementType2,
          elementColor1,
          elementColor2
        );
        waitingTarget = true;
        hideSelectTargetAOE();
      }
    }
    /////////////
    // listener leczenie
    async function createAbilityHeal(
      event,
      selector,
      mp,
      healMin,
      healMax,
      infoDisplay
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTargetHero();

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        const targetPlayerBlock = document.querySelector(
          `.player-block[data-hero-id="${selectedTarget.id}"]`
        );
        const targetHPElement = targetPlayerBlock.querySelector(".hp-amount");

        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }

        calculateHeal(
          healMin,
          healMax,
          selectedTarget,
          hero,
          targetHPElement,
          infoDisplay
        );

        hideSelectTargetHero();
      }
    }
    /////////////
    // listener mana transfer
    async function createAbilityManaTransfer(event, selector, mp, infoDisplay) {
      if (event.target.classList.contains(selector)) {
        await selectTargetHero();

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        const targetPlayerBlock = document.querySelector(
          `.player-block[data-hero-id="${selectedTarget.id}"]`
        );
        const targetMPElement = targetPlayerBlock.querySelector(".mp-amount");

        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }
        transferMana(selectedTarget, hero, targetMPElement, mp, infoDisplay);
        hideSelectTargetHero();
      }
    }
    /////////////
    // listener leczenie aoe
    async function createAbilityHealAOE(
      event,
      selector,
      mp,
      healMin,
      healMax,
      infoDisplay
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTargetHeroAOE();

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        let info = document.querySelector(".info-display");

        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }
        calculateHealAOE(hero, healMin, healMax, info, infoDisplay);

        hideSelectTargetAOE();
      }
    }

    ///////////
    // listener implant element
    async function createAbilityImplant(
      event,
      selector,
      mp,
      infoDisplay,
      element,
      element2,
      elementType,
      elementColor
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetWeakness;

        console.log(selectedTarget, "selected target weakness");
        switch (selectedTarget) {
          case "holy-knight":
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
          case "crucible-knight":
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
          case "ancient-dragon":
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
        }
        console.log(targetWeakness, "target weakness");
        console.log(
          targetWeakness[element],
          "target weakness element1 weakness"
        );
        console.log(
          targetWeakness[element2],
          "target weakness element2 toughness"
        );
        // targetWeakness = {
        //   fire: targetWeakness.fireWeakness,
        //   fireT: targetWeakness.fireTougtness,
        //   ice: targetWeakness.iceWeakness,
        //   iceT: targetWeakness.iceTougtness,
        //   thunder: targetWeakness.thunderWeakness,
        //   thunderT: targetWeakness.thunderTougtness,
        //   earth: targetWeakness.earthWeakness,
        //   earthT: targetWeakness.earthTougtness,
        //   wind: targetWeakness.windWeakness,
        //   windT: targetWeakness.windTougtness,
        //   magic: targetWeakness.magicWeakness,
        //   magicT: targetWeakness.magicTougtness,
        // };
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        let info = document.querySelector(".info-display");

        const hero = heroes.find((hero) => hero.id === heroId);
        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }
        const weaknessTurnCount = document.querySelectorAll(".reduce-wCount");
        console.log(targetWeakness.fireWeakness, "weakness przed implant");
        console.log(targetWeakness.fireTougtness, "toughness przed implant");
        if (
          targetWeakness[element2] === true &&
          targetWeakness[element] === false
        ) {
          console.log(
            targetWeakness[element2],
            "toughness w warunku if przed implementacja"
          );
          targetWeakness[element] = true;
          targetWeakness[element2] = false;
          console.log(
            targetWeakness[element2],
            "toughness w warunku if po implementacji"
          );
        } else if (targetWeakness[element] === false) {
          info.innerHTML = "Its no effective";
          info.style.opacity = "1";
          setTimeout(() => {
            info.style.opacity = "0";
          }, 2000);
          return;
        }
        console.log(targetWeakness.fireWeakness, "weakness po implant");
        console.log(targetWeakness.fireTougtness, "toughness po implant");
        weaknessTurnCount.forEach((weaknessTurn) => {
          weaknessTurn.addEventListener("click", () => {
            if (
              weaknessTurn.classList.contains("reduce-wCount") &&
              weaknessCount > 0
            ) {
              weaknessCount--;
            } else if (weaknessCount === 0) {
              targetWeakness[element] = true;
              targetWeakness[element2] = false;
              weaknessCount = 2;
            }
          });
        });

        info.innerHTML = `${hero.name} used ${infoDisplay} implanting <span class="${elementColor}">${elementType}</span> weakness`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
        hideSelectTarget();
      }
    }

    /////////////
    // dodawanie many
    function gainMana(mp, hero, heroMPElement) {
      if (hero) {
        hero.mp += mp;

        if (hero.mp > hero.maxMp) {
          hero.mp = hero.maxMp;
        }

        heroMPElement.innerHTML = `MP: ${hero.mp}`;
      }
    }

    ////////////
    // sprawdzenie many
    function checkMana(hero, info) {
      info.innerHTML = `${hero.name} have max mana!`;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 1000);
    }

    ////////////
    // odejmowanie many
    function reduceMana(hero, heroMPElement, mp) {
      let info = document.querySelector(".info-display");
      if (hero) {
        if (hero.mp < mp) {
          info.innerHTML = `Not enough mana!`;
          info.style.opacity = "1";
          setTimeout(() => {
            info.style.opacity = "0";
          }, 1000);
          return;
        } else {
          hero.mp -= mp;
        }
        heroMPElement.textContent = `MP: ${hero.mp}`;
      }
      return true;
    }
    ////////////
    // pokaż info
    function showInfo(playerDmg, hero, attackType) {
      let info = document.querySelector(".info-display");
      info.innerHTML = `${hero.name} used ${attackType} dealing ${playerDmg} dmg!`;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }

    ////////////
    // pokaż info z magią
    function showMagicInfo(
      finalDmg,
      hero,
      attackType,
      elementType,
      elementColor
    ) {
      let info = document.querySelector(".info-display");
      info.innerHTML = `${hero.name} used ${attackType} dealing ${finalDmg} <span class="${elementColor}">${elementType}</span> dmg!`;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }
    ////////////
    // pokaż info z magią multi element
    function showMagicInfoMulti(
      finalDmg,
      hero,
      attackType,
      elementType,
      elementType2,
      elementColor,
      elementColor2
    ) {
      let info = document.querySelector(".info-display");
      info.innerHTML = `${hero.name} used ${attackType} dealing ${finalDmg} <span class="${elementColor}">${elementType}</span> and <span class="${elementColor2}">${elementType2}</span> dmg!`;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }
    ////////////
    // pokaż info z magiąAOE
    function showMagicInfoAOE(
      knightDmg,
      crucibleDmg,
      dragonDmg,
      hero,
      attackType,
      elementType,
      elementColor
    ) {
      let info = document.querySelector(".info-display");
      info.innerHTML = `
      <div>${hero.name} used ${attackType} dealing ${knightDmg} <span class="${elementColor}">${elementType}</span> dmg to Holy Knight!</div
      <div>${hero.name} used ${attackType} dealing ${crucibleDmg} <span class="${elementColor}">${elementType}</span> dmg to Crucible Knight!</div>
      <div>${hero.name} used ${attackType} dealing ${dragonDmg} <span class="${elementColor}">${elementType}</span> dmg to Ancient Dragon!</div>
      `;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }
    ///////////
    // pokaż info z magiąAOE multi
    ////////////
    // pokaż info z magiąAOE
    function showMagicInfoAOEMulti(
      knightDmg,
      crucibleDmg,
      dragonDmg,
      hero,
      attackType,
      elementType1,
      elementType2,
      elementColor1,
      elementColor2
    ) {
      let info = document.querySelector(".info-display");
      info.innerHTML = `
      <div>${hero.name} used ${attackType} dealing ${knightDmg} <span class="${elementColor1}">${elementType1}</span> and <span class="${elementColor2}">${elementType2}</span> dmg to Holy Knight!</div
      <div>${hero.name} used ${attackType} dealing ${crucibleDmg} <span class="${elementColor1}">${elementType1}</span> and <span class="${elementColor2}">${elementType2}</span> dmg to Crucible Knight!</div>
      <div>${hero.name} used ${attackType} dealing ${dragonDmg} <span class="${elementColor1}">${elementType1}</span> and <span class="${elementColor2}">${elementType2}</span> dmg to Ancient Dragon!</div>
      `;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }
    ///////////
    // pokaż info focus
    function showInfoFocus(info, hero) {
      info.innerHTML = `${hero.name} recovered 25 MP`;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }

    /////////////
    // wybór stwora
    function selectMonster(selectedTarget) {
      switch (selectedTarget) {
        case "holy-knight":
          return document.querySelector(".knight-hp");
        case "ancient-dragon":
          return document.querySelector(".dragon-hp");
        case "crucible-knight":
          return document.querySelector(".crucible-hp");
      }
      return targetElement;
    }

    ///////////
    // wybór słabości
    function selectMonsterWeakness(selectedTarget) {
      switch (selectedTarget) {
        case "holy-knight":
          return monsterWeakness.holyKnight.Weaknesses;
        case "ancient-dragon":
          return monsterWeakness.ancientDragon.Weaknesses;
        case "crucible-knight":
          return monsterWeakness.crucibleKnight.Weaknesses;
      }
    }
    ///////////
    // wybór słabości aoe
    function selectMonsterWeaknessAoe(selectedTargets) {
      const targetsWeakness = {};
      selectedTargets.forEach((target) => {
        if (target === "holy-knight") {
          targetsWeakness[target] = monsterWeakness.holyKnight.Weaknesses;
        } else if (target === "ancient-dragon") {
          targetsWeakness[target] = monsterWeakness.ancientDragon.Weaknesses;
        } else if (target === "crucible-knight") {
          targetsWeakness[target] = monsterWeakness.crucibleKnight.Weaknesses;
        }
      });
      const checkWeakness = {
        fire: {
          holyKnight: targetsWeakness["holy-knight"].fireWeakness,
          crucibleKnight: targetsWeakness["crucible-knight"].fireWeakness,
          ancientDragon: targetsWeakness["ancient-dragon"].fireWeakness,
        },
        ice: {
          holyKnight: targetsWeakness["holy-knight"].iceWeakness,
          crucibleKnight: targetsWeakness["crucible-knight"].iceWeakness,
          ancientDragon: targetsWeakness["ancient-dragon"].iceWeakness,
        },
        thunder: {
          holyKnight: targetsWeakness["holy-knight"].thunderWeakness,
          crucibleKnight: targetsWeakness["crucible-knight"].thunderWeakness,
          ancientDragon: targetsWeakness["ancient-dragon"].thunderWeakness,
        },
        earth: {
          holyKnight: targetsWeakness["holy-knight"].earthWeakness,
          crucibleKnight: targetsWeakness["crucible-knight"].earthWeakness,
          ancientDragon: targetsWeakness["ancient-dragon"].earthWeakness,
        },
        wind: {
          holyKnight: targetsWeakness["holy-knight"].windWeakness,
          crucibleKnight: targetsWeakness["crucible-knight"].windWeakness,
          ancientDragon: targetsWeakness["ancient-dragon"].windWeakness,
        },
        magic: {
          holyKnight: targetsWeakness["holy-knight"].magicWeakness,
          crucibleKnight: targetsWeakness["crucible-knight"].magicWeakness,
          ancientDragon: targetsWeakness["ancient-dragon"].magicWeakness,
        },
        fireT: {
          holyKnight: targetsWeakness["holy-knight"].fireTougtness,
          crucibleKnight: targetsWeakness["crucible-knight"].fireTougtness,
          ancientDragon: targetsWeakness["ancient-dragon"].fireTougtness,
        },
        iceT: {
          holyKnight: targetsWeakness["holy-knight"].iceTougtness,
          crucibleKnight: targetsWeakness["crucible-knight"].iceTougtness,
          ancientDragon: targetsWeakness["ancient-dragon"].iceTougtness,
        },
        thunderT: {
          holyKnight: targetsWeakness["holy-knight"].thunderTougtness,
          crucibleKnight: targetsWeakness["crucible-knight"].thunderTougtness,
          ancientDragon: targetsWeakness["ancient-dragon"].thunderTougtness,
        },
        earthT: {
          holyKnight: targetsWeakness["holy-knight"].earthTougtness,
          crucibleKnight: targetsWeakness["crucible-knight"].earthTougtness,
          ancientDragon: targetsWeakness["ancient-dragon"].earthTougtness,
        },
        windT: {
          holyKnight: targetsWeakness["holy-knight"].windTougtness,
          crucibleKnight: targetsWeakness["crucible-knight"].windTougtness,
          ancientDragon: targetsWeakness["ancient-dragon"].windTougtness,
        },
        magicT: {
          holyKnight: targetsWeakness["holy-knight"].magicTougtness,
          crucibleKnight: targetsWeakness["crucible-knight"].magicTougtness,
          ancientDragon: targetsWeakness["ancient-dragon"].magicTougtness,
        },
      };

      return checkWeakness;
    }

    ///////////
    // sprawdzenie słabości holy knight
    function weaknessCheckHolyKnight(
      selectWeakness,
      finalDmg,
      weaknessType,
      weaknessType2,
      monsterType
    ) {
      let knightDmg;
      knightDmg = finalDmg;
      if (selectWeakness[weaknessType][monsterType] === true) {
        knightDmg = Math.round((knightDmg *= 1.5));
      } else if (selectWeakness[weaknessType2][monsterType] === true) {
        knightDmg = Math.round((knightDmg *= 0.5));
      }
      return knightDmg;
    }
    // weaknessType = earth, weaknessType2 = wind, weaknessType3 = earthT, weaknessType4 = windT
    ///////////
    // sprawdzenie słabości holy knight multi
    function weaknessCheckHolyKnightMulti(
      selectWeakness,
      finalDmg,
      weaknessType,
      weaknessType2,
      weaknessType3,
      weaknessType4,
      monsterType
    ) {
      let knightDmg;
      knightDmg = finalDmg;
      if (
        selectWeakness[weaknessType][monsterType] === true &&
        selectWeakness[weaknessType2][monsterType] === true
      ) {
        knightDmg = Math.round(finalDmg * 2.0);
      } else if (
        (selectWeakness[weaknessType][monsterType] === true &&
          selectWeakness[weaknessType4][monsterType] === false,
        selectWeakness[weaknessType2][monsterType] === false ||
          (selectWeakness[weaknessType2][monsterType] === true &&
            selectWeakness[weaknessType3][monsterType] === false),
        selectWeakness[weaknessType][monsterType] === false)
      ) {
        knightDmg = Math.round(finalDmg * 1.5);
      } else if (
        (selectWeakness[weaknessType2][monsterType] === true &&
          selectWeakness[weaknessType3][monsterType] === true) ||
        (selectWeakness[weaknessType][monsterType] === true &&
          selectWeakness[weaknessType4][monsterType] === true)
      ) {
        knightDmg = Math.round(finalDmg * 1.0);
      } else if (
        (selectWeakness[weaknessType][monsterType] === false &&
          selectWeakness[weaknessType4][monsterType] === true) ||
        (selectWeakness[weaknessType2][monsterType] === false &&
          selectWeakness[weaknessType3][monsterType] === true)
      ) {
        knightDmg = Math.round(finalDmg * 0.5);
      } else if (
        selectWeakness[weaknessType3][monsterType] === true &&
        selectWeakness[weaknessType4][monsterType] === true
      ) {
        knightDmg = Math.round(finalDmg * 0.2);
      }

      return knightDmg;
    }
    ///////////
    // sprawdzenie słabości smok
    function weaknessCheckDragon(
      selectWeakness,
      finalDmg,
      weaknessType,
      weaknessType2,
      monsterType
    ) {
      let dragonDmg;
      dragonDmg = finalDmg;
      if (selectWeakness[weaknessType][monsterType] === true) {
        dragonDmg = Math.round((dragonDmg *= 1.5));
      } else if (selectWeakness[weaknessType2][monsterType] === true) {
        dragonDmg = Math.round((dragonDmg *= 0.5));
      }
      return dragonDmg;
    }
    ///////////
    // sprawdzenie słabości smok multi
    function weaknessCheckDragonMulti(
      selectWeakness,
      finalDmg,
      weaknessType,
      weaknessType2,
      weaknessType3,
      weaknessType4,
      monsterType
    ) {
      let dragonDmg;
      dragonDmg = finalDmg;
      if (
        selectWeakness[weaknessType][monsterType] === true &&
        selectWeakness[weaknessType2][monsterType] === true
      ) {
        dragonDmg = Math.round(finalDmg * 2.0);
      } else if (
        (selectWeakness[weaknessType][monsterType] === true &&
          (selectWeakness[weaknessType4][monsterType] === false,
          selectWeakness[weaknessType2][monsterType]) === false) ||
        (selectWeakness[weaknessType2][monsterType] === true &&
          (selectWeakness[weaknessType3][monsterType] === false,
          selectWeakness[weaknessType][monsterType]) === false)
      ) {
        dragonDmg = Math.round(finalDmg * 1.5);
      } else if (
        (selectWeakness[weaknessType2][monsterType] === true &&
          selectWeakness[weaknessType3][monsterType] === true) ||
        (selectWeakness[weaknessType][monsterType] === true &&
          selectWeakness[weaknessType4][monsterType] === true)
      ) {
        dragonDmg = Math.round(finalDmg * 1.0);
      } else if (
        (selectWeakness[weaknessType][monsterType] === false &&
          selectWeakness[weaknessType4][monsterType] === true) ||
        (selectWeakness[weaknessType2][monsterType] === false &&
          selectWeakness[weaknessType3][monsterType] === true)
      ) {
        dragonDmg = Math.round(finalDmg * 0.5);
      } else if (
        selectWeakness[weaknessType3][monsterType] === true &&
        selectWeakness[weaknessType4][monsterType] === true
      ) {
        dragonDmg = Math.round(finalDmg * 0.2);
      }

      return dragonDmg;
    }
    ///////////
    // sprawdzenie słabości crucible knight
    function weaknessCheckCrucible(
      selectWeakness,
      finalDmg,
      weaknessType,
      weaknessType2,
      monsterType
    ) {
      let crucibleDmg;
      crucibleDmg = finalDmg;
      if (selectWeakness[weaknessType][monsterType] === true) {
        crucibleDmg = Math.round((crucibleDmg *= 1.5));
      } else if (selectWeakness[weaknessType2][monsterType] === true) {
        crucibleDmg = Math.round((crucibleDmg *= 0.5));
      }
      return crucibleDmg;
    }
    ///////////
    // sprawdzenie słabości crucible knight multi
    function weaknessCheckCrucibleMulti(
      selectWeakness,
      finalDmg,
      weaknessType,
      weaknessType2,
      weaknessType3,
      weaknessType4,
      monsterType
    ) {
      let crucibleDmg;
      crucibleDmg = finalDmg;
      if (
        selectWeakness[weaknessType][monsterType] === true &&
        selectWeakness[weaknessType2][monsterType] === true
      ) {
        crucibleDmg = Math.round(finalDmg * 2.0);
      } else if (
        (selectWeakness[weaknessType][monsterType] === true &&
          selectWeakness[weaknessType4][monsterType] === false,
        selectWeakness[weaknessType2][monsterType] === false ||
          (selectWeakness[weaknessType2][monsterType] === true &&
            selectWeakness[weaknessType3][monsterType] === false),
        selectWeakness[weaknessType][monsterType] === false)
      ) {
        crucibleDmg = Math.round(finalDmg * 1.5);
      } else if (
        (selectWeakness[weaknessType2][monsterType] === true &&
          selectWeakness[weaknessType3][monsterType] === true) ||
        (selectWeakness[weaknessType][monsterType] === true &&
          selectWeakness[weaknessType4][monsterType] === true)
      ) {
        crucibleDmg = Math.round(finalDmg * 1.0);
      } else if (
        (selectWeakness[weaknessType][monsterType] === false &&
          selectWeakness[weaknessType4][monsterType] === true) ||
        (selectWeakness[weaknessType2][monsterType] === false &&
          selectWeakness[weaknessType3][monsterType] === true)
      ) {
        crucibleDmg = Math.round(finalDmg * 0.5);
      } else if (
        selectWeakness[weaknessType3][monsterType] === true &&
        selectWeakness[weaknessType4][monsterType] === true
      ) {
        crucibleDmg = Math.round(finalDmg * 0.2);
      }

      return crucibleDmg;
    }

    /////////
    // sprawdzenie słabości
    function weaknessCheck(targetWeakness, finalDmg, element) {
      const typeWeakness = {
        fire: targetWeakness.fireWeakness,
        ice: targetWeakness.iceWeakness,
        thunder: targetWeakness.thunderWeakness,
        wind: targetWeakness.windWeakness,
        earth: targetWeakness.earthWeakness,
        magic: targetWeakness.magicWeakness,
      };
      const typeTougthness = {
        fire: targetWeakness.fireTougtness,
        ice: targetWeakness.iceTougtness,
        thunder: targetWeakness.thunderTougtness,
        wind: targetWeakness.windTougtness,
        earth: targetWeakness.earthTougtness,
        magic: targetWeakness.magicTougtness,
      };

      if (typeWeakness[element] === true) {
        finalDmg = Math.round(finalDmg * 1.5);
      } else if (typeTougthness[element] === true) {
        finalDmg = Math.round(finalDmg * 0.5);
      }
      return finalDmg;
    }
    // ///////////
    // // sprawdzenie słabości implant
    // function weaknessImplant(targetWeakness, element, info) {
    //   const typeWeakness = {
    //     fire: targetWeakness.fireWeakness,
    //     ice: targetWeakness.iceWeakness,
    //     thunder: targetWeakness.thunderWeakness,
    //     wind: targetWeakness.windWeakness,
    //     earth: targetWeakness.earthWeakness,
    //     magic: targetWeakness.magicWeakness,
    //   };
    //   const typeTougthness = {
    //     fire: targetWeakness.fireTougtness,
    //     ice: targetWeakness.iceTougtness,
    //     thunder: targetWeakness.thunderTougtness,
    //     wind: targetWeakness.windTougtness,
    //     earth: targetWeakness.earthTougtness,
    //     magic: targetWeakness.magicTougtness,
    //   };
    //   let result;
    //   if (
    //     (typeTougthness[element] === true ||
    //       typeTougthness[element] === false) &&
    //     typeWeakness[element] === false
    //   ) {
    //     result = {
    //       typeWeakness: (typeWeakness[element] = true),
    //       typeTougthness: (typeTougthness[element] = false),
    //     };
    //   } else if (
    //     typeTougthness[element] === false &&
    //     typeWeakness[element] === true
    //   ) {
    //     info.innerHTML = "Its no effective";
    //     info.style.opacity = "1";
    //     setTimeout(() => {
    //       info.style.opacity = "0";
    //     }, 2000);
    //     return;
    //   }

    //   console.log(result, "result przed forEach");
    //   const weaknessTurnCount = document.querySelectorAll(".reduce-wCount");
    //   weaknessTurnCount.forEach((weaknessTurn) => {
    //     weaknessTurn.addEventListener("click", () => {
    //       if (
    //         weaknessTurn.classList.contains("reduce-wCount") &&
    //         weaknessCount > 0
    //       ) {
    //         weaknessCount--;
    //       } else if (weaknessCount === 0) {
    //         typeTougthness[element] = true;
    //         typeWeakness[element] = false;
    //         weaknessCount = 2;
    //       }
    //     });
    //   });
    //   console.log(weaknessCount);
    //   console.log(result, "result po forEach");

    //   console.log(targetWeakness, "target weakness po wypisaniu result");
    //   return result;
    // }
    ///////////
    // sprawdzenie słabości multi element
    function weaknessCheckMulti(targetWeakness, finalDmg, element, element2) {
      const typeWeakness = {
        fire: targetWeakness.fireWeakness,
        ice: targetWeakness.iceWeakness,
        thunder: targetWeakness.thunderWeakness,
        wind: targetWeakness.windWeakness,
        earth: targetWeakness.earthWeakness,
        magic: targetWeakness.magicWeakness,
      };
      const typeTougthness = {
        fire: targetWeakness.fireTougtness,
        ice: targetWeakness.iceTougtness,
        thunder: targetWeakness.thunderTougtness,
        wind: targetWeakness.windTougtness,
        earth: targetWeakness.earthTougtness,
        magic: targetWeakness.magicTougtness,
      };

      if (typeWeakness[element] === true && typeWeakness[element2] === true) {
        finalDmg = Math.round(finalDmg * 2.0);
      } else if (
        (typeWeakness[element] === true && typeWeakness[element2] === false,
        typeTougthness[element2] === false ||
          (typeWeakness[element2] === true && typeWeakness[element] === false),
        typeTougthness[element] === false)
      ) {
        finalDmg = Math.round(finalDmg * 1.5);
      } else if (
        (typeWeakness[element2] === true && typeTougthness[element] === true) ||
        (typeWeakness[element] === true && typeTougthness[element2] === true)
      ) {
        finalDmg = Math.round(finalDmg * 1.0);
      } else if (
        typeTougthness[element] === true &&
        typeTougthness[element2] === true
      ) {
        finalDmg = Math.round(finalDmg * 0.2);
      }

      return finalDmg;
    }

    ///////////
    // odejmomwanie hp
    function reduceHp(selectedTarget, targetElement, playerDmg) {
      if (selectedTarget === "holy-knight") {
        hkHp -= playerDmg;
        if (hkHp < 0) hkHp = 0;
        targetElement.innerHTML = `HP: ${hkHp}`;
      } else if (selectedTarget === "ancient-dragon") {
        drgHp -= playerDmg;
        if (drgHp < 0) drgHp = 0;
        targetElement.innerHTML = `HP: ${drgHp}`;
      } else if (selectedTarget === "crucible-knight") {
        ckHp -= playerDmg;
        if (ckHp < 0) ckHp = 0;
        targetElement.innerHTML = `HP: ${ckHp}`;
      }
    }
    ///////////
    // odejmomwanie hp magia
    function reduceHpMagic(selectedTarget, targetElement, finalDmg) {
      if (selectedTarget === "holy-knight") {
        hkHp -= finalDmg;
        if (hkHp < 0) hkHp = 0;
        targetElement.innerHTML = `HP: ${hkHp}`;
      } else if (selectedTarget === "ancient-dragon") {
        drgHp -= finalDmg;
        if (drgHp < 0) drgHp = 0;
        targetElement.innerHTML = `HP: ${drgHp}`;
      } else if (selectedTarget === "crucible-knight") {
        ckHp -= finalDmg;
        if (ckHp < 0) ckHp = 0;
        targetElement.innerHTML = `HP: ${ckHp}`;
      }
    }
    //////////
    // odejmowanie hp w aoe magi
    function reduceHpAOE(knightDmg, dragonDmg, crucibleDmg) {
      hkHp -= knightDmg;
      if (hkHp < 0) {
        hkHp = 0;
      }
      holyKnightHp.innerHTML = `HP: ${hkHp}`;

      drgHp -= dragonDmg;
      if (drgHp < 0) {
        drgHp = 0;
      }
      dragonHp.innerHTML = `HP: ${drgHp}`;

      ckHp -= crucibleDmg;
      if (ckHp < 0) {
        ckHp = 0;
      }
      crucibleKnightHp.innerHTML = `HP: ${ckHp}`;
    }
    /////////
    // dodawanie hp bohaterowi
    function calculateHeal(
      healMin,
      healMax,
      selectedTarget,
      hero,
      targetHPElement,
      infoDisplay
    ) {
      let healingValue = healingSpells(healMin, healMax);
      selectedTarget.hp += healingValue;
      if (selectedTarget.hp > selectedTarget.maxHp) {
        selectedTarget.hp = selectedTarget.maxHp;
      }
      targetHPElement.innerHTML = `HP: ${selectedTarget.hp}`;

      let info = document.querySelector(".info-display");
      info.innerHTML = `${hero.name} used ${infoDisplay} recovered <span class="heal-type">${healingValue}</span> for ${selectedTarget.name} `;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }
    /////////
    // mana transfer
    function transferMana(
      selectedTarget,
      hero,
      targetMPElement,
      mp,
      infoDisplay
    ) {
      selectedTarget.mp += mp;
      if (selectedTarget.mp > selectedTarget.maxMp) {
        selectedTarget.mp = selectedTarget.maxMp;
      }
      targetMPElement.innerHTML = `HP: ${selectedTarget.mp}`;

      let info = document.querySelector(".info-display");
      info.innerHTML = `${hero.name} used ${infoDisplay} gave <span class="mana-type">${mp}</span> mp for ${selectedTarget.name} `;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }
    /////////
    // dodawanie hp bohaterom
    function calculateHealAOE(hero, healMin, healMax, info, infoDisplay) {
      let message;
      const allPlayers = Object.values(selectedTargets);
      allPlayers.forEach((player) => {
        let healingValue = healingSpells(healMin, healMax);
        player.hp += healingValue;
        if (player.hp > player.maxHp) {
          player.hp = player.maxHp;
        }

        const targetPlayerBlock = document.querySelector(
          `.player-block[data-hero-id="${player.id}"]`
        );
        const targetHPElement = targetPlayerBlock.querySelector(".hp-amount");
        targetHPElement.innerHTML = `HP: ${player.hp}`;

        message += `<div>${hero.name} used ${infoDisplay} recovered <span class="heal-type">${healingValue}</span> to ${player.name}!</div>
        `;
      });
      info.innerHTML = message;
      info.style.opacity = "1";
      setTimeout(() => {
        info.style.opacity = "0";
      }, 2000);
    }
  } // koniec warunku if selected hero

  ///////////////
  // logika odblokowania umiejętności bohaterów
  function unlockLocked(
    event,
    selector,
    updateCount,
    currentCount,
    countAmount
  ) {
    const playerBlock = event.target.closest(".player-block");
    const heroId = playerBlock.getAttribute("data-hero-id");
    const energyGatherButton = playerBlock.querySelector(`.${selector}`);

    if (
      energyGatherButton.classList.contains("disabled") &&
      currentCount === 0
    ) {
      energyGatherButton.classList.remove("disabled");
      updateCount(currentCount + countAmount);
    } else if (energyGatherButton.classList.contains("disabled")) {
      updateCount(currentCount - 1);
    } else {
      return;
    }
  }

  ///////////////
  // logika odblokowania umiejętności sorcerer
  function unlockSorcerer(turnCountSorcerer) {
    const otherSkills = document.querySelectorAll(".unlock-blocked");
    if (!areListenersAdded) {
      otherSkills.forEach((skill) => {
        skill.addEventListener("click", (event) => {
          const playerBlock = event.target.closest(".player-block");
          const heroId = playerBlock.getAttribute("data-hero-id");
          const energyGatherButton =
            playerBlock.querySelector(".energy-gathering");
          if (
            energyGatherButton.classList.contains("disabled") &&
            turnCountSorcerer === 0
          ) {
            energyGatherButton.classList.remove("disabled");
            turnCountSorcerer = 2;
          } else if (energyGatherButton.classList.contains("disabled")) {
            turnCountSorcerer--;
          } else {
            return;
          }
        });
      });
      areListenersAdded = true;
    }
  }

  ///////////////
  // logika odblokowania umiejętności spellblade
  const otherSkills2 = document.querySelectorAll(".unlock-blocked2");
  otherSkills2.forEach((skill) => {
    skill.addEventListener("click", (event) => {
      const playerBlock = event.target.closest(".player-block");
      const heroId = playerBlock.getAttribute("data-hero-id");
      const energyGatherButton = playerBlock.querySelector(".meditate");
      if (
        energyGatherButton.classList.contains("disabled") &&
        turnCountSpellblade === 0
      ) {
        energyGatherButton.classList.remove("disabled");
        turnCountSpellblade = 2;
      } else if (energyGatherButton.classList.contains("disabled")) {
        turnCountSpellblade--;
      } else {
        return;
      }
    });
  });

  ///////////////
  // logika odblokowania umiejętności druid
  const otherSkills3 = document.querySelectorAll(".unlock-blocked3");
  otherSkills3.forEach((skill) => {
    skill.addEventListener("click", (event) => {
      const playerBlock = event.target.closest(".player-block");
      const heroId = playerBlock.getAttribute("data-hero-id");
      const energyGatherButton = playerBlock.querySelector(".mana-seed");
      if (
        energyGatherButton.classList.contains("disabled") &&
        turnCountDruid === 0
      ) {
        energyGatherButton.classList.remove("disabled");
        turnCountDruid = 2;
      } else if (energyGatherButton.classList.contains("disabled")) {
        turnCountDruid--;
      } else {
        return;
      }
    });
  });
  ///////////////
  // logika odblokowania umiejętności healer

  // otherSkills4.forEach((skill) => {
  //   unlockLocked(skill, "pray", turnCountHealer, 0, 2);
  // });

  ///////////////
  // koniec funkcji addHero
}

const removeHero = (heroId) => {
  const playerBlock = playerSection.querySelector(
    `.player-block[data-hero-id='${heroId}']`
  );
  const hero = heroes.find((hero) => hero.id === heroId);

  if (playerBlock) {
    playerSection.removeChild(playerBlock);
    selectedButtons.delete(heroId);
    if (playerNumber.player1 === hero) {
      playerNumber.player1 = document.getElementById("player-1");
    } else if (playerNumber.player2 === hero) {
      playerNumber.player2 = document.getElementById("player-2");
    } else if (playerNumber.player3 === hero) {
      playerNumber.player3 = document.getElementById("player-3");
    } else if (playerNumber.player4 === hero) {
      playerNumber.player4 = document.getElementById("player-4");
    }
  }
};

const toggleButton = (button) => {
  const heroId = button.dataset.heroId;

  if (selectedButtons.has(heroId)) {
    selectedButtons.delete(heroId);
    button.style.backgroundColor = "";
    removeHero(heroId);
  } else {
    selectedButtons.add(heroId);
    button.style.backgroundColor = "lightblue";
    addHero(heroId);
  }

  if (selectedButtons.size >= 4) {
    addHeroButton.forEach((btn) => {
      btn.classList.add("hidden");
    });
  } else {
    addHeroButton.forEach((btn) => btn.classList.remove("hidden"));
  }
};

addHeroButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    let heroId;

    switch (event.target.id) {
      case "warriorBtn":
        heroId = "wrw";
        break;
      case "defenderBtn":
        heroId = "dfd";
        break;
      case "healerBtn":
        heroId = "hlr";
        break;
      case "sorcererBtn":
        heroId = "srcr";
        break;
      case "spellbladeBtn":
        heroId = "sbb";
        break;
      case "druidBtn":
        heroId = "drd";
        break;
      case "alchemistBtn":
        heroId = "alh";
        break;
      case "elementalMasterBtn":
        heroId = "elm";
        break;
      default:
        console.log("Error with button id");
        return;
    }

    button.dataset.heroId = heroId;
    toggleButton(button);
  });
});

let selectedTarget = null;
let selectedTargets = null;

function selectTarget() {
  return new Promise((resolve) => {
    const targetButtons = document.querySelectorAll(".target");

    targetButtons.forEach((button) => {
      showSelectTarget();
      button.addEventListener("click", (event) => {
        selectedTarget = event.target.getAttribute("data-target");
        resolve(selectedTarget);
      });
    });
  });
}

function selectTargetHero() {
  return new Promise((resolve) => {
    targetButtons.forEach((button) => {
      showSelectTargetHero();
      button.addEventListener("click", (event) => {
        if (event.target === document.getElementById("player-1")) {
          selectedTarget = playerNumber.player1;
        } else if (event.target === document.getElementById("player-2")) {
          selectedTarget = playerNumber.player2;
        } else if (event.target === document.getElementById("player-3")) {
          selectedTarget = playerNumber.player3;
        } else if (event.target === document.getElementById("player-4")) {
          selectedTarget = playerNumber.player4;
        }

        resolve(selectedTarget);
      });
    });
  });
}
function selectTargetHeroAOE() {
  return new Promise((resolve) => {
    const targetButton = document.querySelector(".target-aoe");
    showSelectTargetAOE();
    targetButton.addEventListener("click", () => {
      selectedTargets = playerNumber;
      resolve(selectedTargets);
    });
  });
}

function selectTargetAoe() {
  return new Promise((resolve) => {
    const targetButton = document.querySelector(".target-aoe");
    const allTargets = document.querySelectorAll(".target");
    showSelectTargetAOE();
    const targetsArray = Array.from(allTargets).map((target) =>
      target.getAttribute("data-target")
    );

    targetButton.addEventListener("click", (event) => {
      selectedTargets = targetsArray;
      resolve(selectedTargets);
    });
  });
}

function showSelectTarget() {
  const targetButtons = document.querySelectorAll(".target");

  targetButtons.forEach((button) => {
    button.style.display = "block";
  });
}
function showSelectTargetHero() {
  const targetButtons = document.querySelectorAll(".hero-select");

  targetButtons.forEach((button) => {
    button.style.display = "block";
  });
}
function showSelectTargetAOE() {
  const targetButton = document.querySelector(".target-aoe");
  targetButton.style.display = "block";
}
function hideSelectTargetAOE() {
  const targetButton = document.querySelector(".target-aoe");
  targetButton.style.display = "none";
}

function hideSelectTarget() {
  const targetButtons = document.querySelectorAll(".target");

  targetButtons.forEach((button) => {
    button.style.display = "none";
  });
}
function hideSelectTargetHero() {
  const targetButtons = document.querySelectorAll(".hero-select");

  targetButtons.forEach((button) => {
    button.style.display = "none";
  });
}
function BuffMagic() {
  buffStats = true;
}
function BuffMagic2() {
  buffEnhance = true;
}
const sprawdzDzialanie = document.querySelector(".sprawdz");
sprawdzDzialanie.addEventListener("click", () => {
  console.log(playerNumber, "player number");
  console.log(targetButtons, "targetButtons");
  // const zobaczHP = document.querySelector(".hp-amount");
  // console.log(zobaczHP); // by zobaczyć wklej kod do addHero na dole funkcji
});
