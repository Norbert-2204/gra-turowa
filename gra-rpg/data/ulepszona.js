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
let targetButtons = document.querySelectorAll(".hero-select");

let hkHp = 3000;
let ckHp = 5000;
let drgHp = 9999;
let buffStats = false;
let buffEnhance = false;
let turnCount = 2;
let turnCount2 = 1;
let turnCount3 = 0;
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
    if (!playerNumber.player1 === selectedHero.id) {
      playerNumber.player1 = document.getElementById("player-1");
      console.log("brak bohater");
    } else {
      console.log("jest bohatera");
    }
    console.log(playerNumber, "po działaniu");

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
      createAbilityManaPlus(
        event,
        "warrior-normal-attack",
        15,
        20,
        "normal attack",
        1.7,
        null
      );
    });

    //////////////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      createAbilityManaPlus(
        event,
        "warrior-strong-attack",
        20,
        30,
        "strong attack",
        1.7,
        null
      );
    });

    ////////////////
    // Spear stab
    addSkillsList.addEventListener("click", async (event) => {
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
    });

    ////////////////////
    // Enrage
    addSkillsList.addEventListener("click", async (event) => {
      createAbilitySkill(event, "enrage", 50, 70, "enrage", 15, 1.7, null);
    });

    ///////////////
    // Leap
    addSkillsList.addEventListener("click", async (event) => {
      createAbilitySkill(event, "leap", 70, 100, "leap", 22, 1.7, null);
    });

    //////////////////
    // Brutal takedown
    addSkillsList.addEventListener("click", async (event) => {
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
      createAbilityManaPlus(
        event,
        "sorcerer-normal-attack",
        3,
        8,
        "normal attack",
        null,
        null
      );
    });
    //////////////
    // energy gathering
    addSkillsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("energy-gathering")) {
        if (event.target.classList.contains("energy-gathering")) {
          if (event.target.classList.contains("disabled")) {
            return;
          }
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 60;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used energy gathering recovering mana!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
        const disable = document.querySelector(".energy-gathering");
        disable.classList.add("disabled");
      }
    });

    //////////////
    // fire
    addMagicList.addEventListener("click", async (event) => {
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
    });
    ///////////////
    // Fira
    addMagicList.addEventListener("click", (event) => {
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
    });

    ////////////
    // Firaga
    addMagicList.addEventListener("click", (event) => {
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
    });

    ///////////
    // Blizzard
    addMagicList.addEventListener("click", async (event) => {
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
    });

    /////////////
    // Blizzara
    addMagicList.addEventListener("click", (event) => {
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
    });

    /////////
    // Blizzaga
    addMagicList.addEventListener("click", (event) => {
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
    });

    ///////////
    // Thunder
    addMagicList.addEventListener("click", async (event) => {
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
    });

    ///////////
    // Thundara
    addMagicList.addEventListener("click", (event) => {
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
    });

    ///////////
    // Thundaga
    addMagicList.addEventListener("click", (event) => {
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
    });

    ////////////
    // Gravity
    addMagicList.addEventListener("click", async (event) => {
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
    });

    ///////////
    // Graviga
    addMagicList.addEventListener("click", (event) => {
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
      createAbilityManaPlus(
        event,
        "spellblade-normal-attack",
        15,
        18,
        "normal attack",
        null,
        1.4
      );
    });

    //////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      createAbilityManaPlus(
        event,
        "spellblade-strong-attack",
        18,
        24,
        "strong attack",
        null,
        1.4
      );
    });

    ////////////
    // Meditate
    addSkillsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("meditate")) {
        if (event.target.classList.contains("meditate")) {
          if (event.target.classList.contains("disabled")) {
            return;
          }
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 30;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used meditate to recover mana!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
        const disable = document.querySelector(".meditate");
        disable.classList.add("disabled");
      }
    });

    //////////
    // Weakness fire
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("implant-fire")) {
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
          targetWeakness.fireTougtness === true &&
          targetWeakness.fireWeakness === false
        ) {
          targetWeakness.fireWeakness = true;
          targetWeakness.fireTougtness = false;
        } else if (targetWeakness.fireTougtness === false) {
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
              targetWeakness.fireTougtness = true;
              targetWeakness.fireWeakness = false;
              weaknessCount = 2;
            }
          });
        });
        console.log(targetWeakness.fireTougtness);
        console.log(targetWeakness.fireWeakness);
        console.log(weaknessCount);

        info.innerHTML = `${hero.name} used Weakness fire implanting <span class="fire-type">fire</span> weakness`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
        hideSelectTarget();
      }
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
      createAbilityMagic(
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
    });

    ////////////
    // Ice slash
    addMagicList.addEventListener("click", async (event) => {
      createAbilityMagic(
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
    });

    ////////////
    // Elemental dance
    addMagicList.addEventListener("click", async (event) => {
      createAbilityMagicMulti(
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
    });

    ////////////
    // Fire Tornado
    addMagicList.addEventListener("click", async (event) => {
      createAbilityMagic(
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
    });

    ////////////
    // Ice Tornado
    addMagicList.addEventListener("click", async (event) => {
      createAbilityMagic(
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
    });

    ////////////
    // Elemental tornado
    addMagicList.addEventListener("click", async (event) => {
      createAbilityMagicMulti(
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
    });

    ///////////
    // Zestaw umiejętności Druid
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      focusAbility(event, "druid-focus");
    });
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      createAbilityManaPlus(
        event,
        "druid-normal-attack",
        10,
        18,
        "normal attack",
        null,
        null
      );
    });

    //////////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      createAbilityManaPlus(
        event,
        "druid-strong-attack",
        15,
        22,
        "strong attack",
        null,
        null
      );
    });

    //////////////
    // Thorns
    addSkillsList.addEventListener("click", async (event) => {
      createAbilitySkill(event, "thorns", 30, 40, "thorns", 5, null, null);
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
      createAbilityHeal(event, "druid-cure", 15, 30, 50);
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
      buffEnhance
    ) {
      if (event.target.classList.contains(selector)) {
        await selectTarget();

        if (!selectTarget) {
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
        gainMana(10, hero, heroMPElement);
        showInfo(playerDmg, hero, infoDisplay);

        hideSelectTarget();
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
        console.log(weaknessCount);
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
        hideSelectTargetAOE();
      }
    }
    /////////////
    // listener leczenie
    async function createAbilityHeal(event, selector, mp, healMin, healMax) {
      if (event.target.classList.contains(selector)) {
        await selectTargetHero();

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const heroHPElement = playerBlock.querySelector(".hp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        const targetPlayerBlock = document.querySelector(
          `.player-block[data-hero-id="${selectedTarget.id}"]`
        );
        const targetHPElement = targetPlayerBlock.querySelector(".hp-amount");

        if (!reduceMana(hero, heroMPElement, mp)) {
          return;
        }

        let healingValue = healingSpells(healMin, healMax);
        selectedTarget.hp += healingValue;
        if (selectedTarget.hp > selectedTarget.maxHp) {
          selectedTarget.hp = selectedTarget.maxHp;
        }
        targetHPElement.innerHTML = `HP: ${selectedTarget.hp}`;

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used Cure recovered ${healingValue} for ${selectedTarget.name} `;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTargetHero();
      }
    }

    /////////////
    // listener implant element
    // async function createAbilityImplant(
    //   event,
    //   selector,
    //   mp,
    //   infoDisplay,
    //   element,
    //   element2,
    //   elementType,
    //   elementColor
    // ) {
    //   if (event.target.classList.contains(selector)) {
    //     await selectTarget();

    //     if (!selectTarget) {
    //       return;
    //     }
    //     let targetWeakness = selectMonsterWeakness(selectedTarget);
    //     targetWeakness = {
    //       fire: targetWeakness.fireWeakness,
    //       fireT: targetWeakness.fireTougtness,
    //       ice: targetWeakness.iceWeakness,
    //       iceT: targetWeakness.iceTougtness,
    //       thunder: targetWeakness.thunderWeakness,
    //       thunderT: targetWeakness.thunderTougtness,
    //       earth: targetWeakness.earthWeakness,
    //       earthT: targetWeakness.earthTougtness,
    //       wind: targetWeakness.windWeakness,
    //       windT: targetWeakness.windTougtness,
    //       magic: targetWeakness.magicWeakness,
    //       magicT: targetWeakness.magicTougtness,
    //     };
    //     const playerBlock = event.target.closest(".player-block");
    //     const heroId = playerBlock.getAttribute("data-hero-id");
    //     const heroMPElement = playerBlock.querySelector(".mp-amount");
    //     let info = document.querySelector(".info-display");

    //     const hero = heroes.find((hero) => hero.id === heroId);
    //     if (!reduceMana(hero, heroMPElement, mp)) {
    //       return;
    //     }
    //     const weaknessTurnCount = document.querySelectorAll(".reduce-wCount");
    //     console.log(targetWeakness.iceWeakness, "weakness przed implant");
    //     console.log(targetWeakness.iceTougtness, "toughness przed implant");
    //     if (
    //       targetWeakness[element] === true &&
    //       targetWeakness[element2] === false
    //     ) {
    //       targetWeakness[element2] = true;
    //       targetWeakness[element] = false;
    //       console.log(targetWeakness[element2]);
    //     } else if (targetWeakness[element] === false) {
    //       info.innerHTML = "Its no effective";
    //       info.style.opacity = "1";
    //       setTimeout(() => {
    //         info.style.opacity = "0";
    //       }, 2000);
    //       return;
    //     }
    //     console.log(targetWeakness.iceWeakness, "weakness po implant");
    //     console.log(targetWeakness.iceTougtness, "toughness po implant");
    //     weaknessTurnCount.forEach((weaknessTurn) => {
    //       weaknessTurn.addEventListener("click", () => {
    //         if (
    //           weaknessTurn.classList.contains("reduce-wCount") &&
    //           weaknessCount > 0
    //         ) {
    //           weaknessCount--;
    //         } else if (weaknessCount === 0) {
    //           targetWeakness[element] = true;
    //           targetWeakness[element2] = false;
    //           weaknessCount = 2;
    //         }
    //       });
    //     });

    //     info.innerHTML = `${hero.name} used ${infoDisplay} implanting <span class="${elementColor}">${elementType}</span> weakness`;
    //     info.style.opacity = "1";
    //     setTimeout(() => {
    //       info.style.opacity = "0";
    //     }, 2000);
    //     hideSelectTarget();
    //   }
    // }

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
    // sprawdzenie słabości
    // function weaknessCheck(targetWeakness, finalDmg, element) {
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

    //   if (typeWeakness[element] === true) {
    //     finalDmg = Math.round(finalDmg * 1.5);
    //   } else if (typeTougthness[element] === true) {
    //     finalDmg = Math.round(finalDmg * 0.5);
    //   }
    //   console.log(typeTougthness[element], "toughness");
    //   console.log(typeWeakness[element], "weakness");
    //   return finalDmg;
    // }
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
  } // koniec warunku if selected hero

  ///////////////
  // logika odblokowania umiejętności sorcerer
  const otherSkills = document.querySelectorAll(".unlock-blocked");
  otherSkills.forEach((skill) => {
    skill.addEventListener("click", (event) => {
      const playerBlock = event.target.closest(".player-block");
      const heroId = playerBlock.getAttribute("data-hero-id");

      const energyGatherButton = playerBlock.querySelector(".energy-gathering");
      if (
        energyGatherButton.classList.contains("disabled") &&
        turnCount === 0
      ) {
        energyGatherButton.classList.remove("disabled");
        turnCount = 2;
      } else if (energyGatherButton.classList.contains("disabled")) {
        turnCount--;
      } else {
        return;
      }
    });
  });

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
        turnCount2 === 0
      ) {
        energyGatherButton.classList.remove("disabled");
        turnCount2 = 1;
      } else if (energyGatherButton.classList.contains("disabled")) {
        turnCount2--;
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
        turnCount2 === 0
      ) {
        energyGatherButton.classList.remove("disabled");
        turnCount2 = 1;
      } else if (energyGatherButton.classList.contains("disabled")) {
        turnCount2--;
      } else {
        return;
      }
    });
  });
  ///////////////
}

const removeHero = (heroId) => {
  const playerBlock = playerSection.querySelector(
    `.player-block[data-hero-id='${heroId}']`
  );
  const hero = heroes.find((hero) => hero.id === heroId);
  console.log(hero);
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
        console.log(event.target, "event target");
        console.log(selectedTarget, "selected Target");
        resolve(selectedTarget);
      });
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
// const sprawdzDzialanie = document.querySelector(".sprawdz");
// sprawdzDzialanie.addEventListener("click", () => {
//   console.log(playerNumber, "player number");
//   console.log(targetButtons, "targetButtons");
// });
