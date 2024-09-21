import { heroes } from "./heroes.js";
import { Heroes } from "./hero-skills.js";
import {
  healingSpells,
  magicSpells,
  normalStrongAttack,
} from "./skills-magic.js";
import { monsterWeakness } from "./monster-data.js";

const addHeroButton = document.querySelectorAll(".btn");
const selectedButtons = new Set();
const playerSection = document.querySelector(".js-player-placement");
const heroInstance = new Heroes();
const holyKnightHp = document.querySelector(".knight-hp");
const crucibleKnightHp = document.querySelector(".crucible-hp");
const dragonHp = document.querySelector(".dragon-hp");
const targetButtons = document.querySelectorAll(".hero-select");

let hkHp = 3000;
let ckHp = 5000;
let drgHp = 9999;
let buffStats = false;
let buffEnhance = false;
let turnCount = 2;
let turnCount2 = 1;
let turnCount3 = 0;
let weaknessCount = 2;

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
  }

  let selectHealButton = "";
  if ((selectedHero.id = "wrw")) {
    selectHealButton = heroInstance.warrior.healingSelectButton;
  } else if ((selectedHero.id = "dfd")) {
    selectHealButton = heroInstance.defender.healingSelectButton;
  } else if ((selectedHero.id = "hlr")) {
    selectHealButton = heroInstance.healer.healingSelectButton;
  } else if ((selectedHero.id = "srcr")) {
    selectHealButton = heroInstance.sorcerer.healingSelectButton;
  } else if ((selectedHero.id = "sbb")) {
    selectHealButton = heroInstance.spellblade.healingSelectButton;
  } else if ((selectedHero.id = "drd")) {
    selectHealButton = heroInstance.druid.healingSelectButton;
  }

  if (selectedHero) {
    const playerHtml = `
      <div class="player-block hero-img" data-hero-id="${selectedHero.id}" style="background-image: url('${selectedHero.img}')">
        <p>${selectedHero.name}</p>
        <div class="hp-mp-select-info">
          <div class="hero-select-heal">${selectHealButton}</div>
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
    let addSelectButton = playerSection.querySelector(
      `.player-block[data-hero-id="${selectedHero.id}"] .hero-select-heal`
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
      if (event.target.classList.contains("warrior-focus")) {
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        let info = document.querySelector(".info-display");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero.mp === hero.maxMp) {
          info.innerHTML = `${hero.name} have max mana!`;
          info.style.opacity = "1";
          setTimeout(() => {
            info.style.opacity = "0";
          }, 1000);
          return;
        }

        if (hero) {
          hero.mp += 25;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        info.innerHTML = `${hero.name} recovered 25 MP`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
      }
    });

    //////////////
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("warrior-normal-attack")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }

        let playerDmg = normalStrongAttack(15, 20);

        if (buffStats === true) {
          playerDmg = Math.round((playerDmg *= 1.7));
          buffStats = false;
        }

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

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 10;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used normal attack dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    //////////////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("warrior-strong-attack")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }

        let playerDmg = normalStrongAttack(20, 30);

        if (buffStats === true) {
          playerDmg = Math.round((playerDmg *= 1.7));
          buffStats = false;
        }

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

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 5;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used strong attack dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////////
    // Spear stab
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("spear-stab")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 8) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 8;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let playerDmg = normalStrongAttack(30, 45);

        if (buffStats === true) {
          playerDmg = Math.round((playerDmg *= 1.7));
          buffStats = false;
        }

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

        info.innerHTML = `${hero.name} used spear stab dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////////////
    // Enrage
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("enrage")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 15) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 15;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let playerDmg = normalStrongAttack(50, 70);

        if (buffStats === true) {
          playerDmg = Math.round((playerDmg *= 1.7));
          buffStats = false;
        }

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

        info.innerHTML = `${hero.name} used enrage attack dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ///////////////
    // Leap
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("leap")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 22) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 22;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let playerDmg = normalStrongAttack(70, 100);

        if (buffStats === true) {
          playerDmg = Math.round((playerDmg *= 1.7));
          buffStats = false;
        }

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

        info.innerHTML = `${hero.name} used leap dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    //////////////////
    // Brutal takedown
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("brutal-takedown")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }
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

        let playerDmg = normalStrongAttack(150, 300);

        if (buffStats === true) {
          playerDmg = Math.round((playerDmg *= 1.7));
          buffStats = false;
        }

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

        info.innerHTML = `${hero.name} used brutal takedown dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
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
      if (event.target.classList.contains("sorcerer-focus")) {
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        let info = document.querySelector(".info-display");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero.mp === hero.maxMp) {
          info.innerHTML = `${hero.name} have max mana!`;
          info.style.opacity = "1";
          setTimeout(() => {
            info.style.opacity = "0";
          }, 1000);
          return;
        }

        if (hero) {
          hero.mp += 25;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        info.innerHTML = `${hero.name} recovered 25 MP`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
      }
    });

    //////////////
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("sorcerer-normal-attack")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }

        let playerDmg = normalStrongAttack(3, 8);

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

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 2;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used normal attack dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
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
      if (event.target.classList.contains("sorcerer-fire-magic")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(25, 40);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 10) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 10;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (targetWeakness.fireWeakness === true) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (targetWeakness.fireTougtness === true) {
          finalDmg = Math.round(finalDmg * 0.5);
        }

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

        info.innerHTML = `${hero.name} used Fire dealing ${finalDmg} <span class="fire-type">fire</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });
    ///////////////
    // Fira
    addMagicList.addEventListener("click", (event) => {
      if (event.target.classList.contains("sorcerer-fira-magic")) {
        const targets = [
          {
            name: "holy-knight",
            get hp() {
              return hkHp;
            },
            set hp(value) {
              hkHp = value;
            },
            element: holyKnightHp,
            weakness: monsterWeakness.holyKnight.Weaknesses,
          },
          {
            name: "ancient-dragon",
            get hp() {
              return drgHp;
            },
            set hp(value) {
              drgHp = value;
            },
            element: dragonHp,
            weakness: monsterWeakness.ancientDragon.Weaknesses,
          },
          {
            name: "crucible-knight",
            get hp() {
              return ckHp;
            },
            set hp(value) {
              ckHp = value;
            },
            element: crucibleKnightHp,
            weakness: monsterWeakness.crucibleKnight.Weaknesses,
          },
        ];

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let message = "";
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 18) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 18;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        const dealDamage = (target) => {
          let playerDmg = magicSpells(45, 60);
          let finalDmg = playerDmg;

          if (target.weakness.fireWeakness === true) {
            finalDmg = Math.round(finalDmg * 1.5);
          } else if (target.weakness.fireTougtness === true) {
            finalDmg = Math.round(finalDmg * 0.5);
          }

          target.hp -= finalDmg;
          if (target.hp < 0) {
            target.hp = 0;
          }
          target.element.innerHTML = `HP: ${target.hp}`;

          message += `${hero.name} used Fira dealing ${finalDmg} <span class="fire-type">fire</span> damage to ${target.name} <br>`;
          return finalDmg;
        };

        const attackEnemies = () => {
          targets.forEach((target) => {
            dealDamage(target);
          });
        };

        attackEnemies();

        info.innerHTML = message;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////
    // Firaga
    addMagicList.addEventListener("click", (event) => {
      if (event.target.classList.contains("sorcerer-firaga-magic")) {
        const targets = [
          {
            name: "holy-knight",
            get hp() {
              return hkHp;
            },
            set hp(value) {
              hkHp = value;
            },
            element: holyKnightHp,
            weakness: monsterWeakness.holyKnight.Weaknesses,
          },
          {
            name: "ancient-dragon",
            get hp() {
              return drgHp;
            },
            set hp(value) {
              drgHp = value;
            },
            element: dragonHp,
            weakness: monsterWeakness.ancientDragon.Weaknesses,
          },
          {
            name: "crucible-knight",
            get hp() {
              return ckHp;
            },
            set hp(value) {
              ckHp = value;
            },
            element: crucibleKnightHp,
            weakness: monsterWeakness.crucibleKnight.Weaknesses,
          },
        ];

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let message = "";
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 25) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 25;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        const dealDamage = (target) => {
          let playerDmg = magicSpells(70, 120);
          let finalDmg = playerDmg;

          if (target.weakness.fireWeakness === true) {
            finalDmg = Math.round(finalDmg * 1.5);
          } else if (target.weakness.fireTougtness === true) {
            finalDmg = Math.round(finalDmg * 0.5);
          }

          target.hp -= finalDmg;
          if (target.hp < 0) {
            target.hp = 0;
          }
          target.element.innerHTML = `HP: ${target.hp}`;

          message += `${hero.name} used Firaga dealing ${finalDmg} <span class="fire-type">fire</span> damage to ${target.name} <br>`;
          return finalDmg;
        };

        const attackEnemies = () => {
          targets.forEach((target) => {
            dealDamage(target);
          });
        };

        attackEnemies();

        info.innerHTML = message;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ///////////
    // Blizzard
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("sorcerer-blizzard-magic")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(25, 40);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 10) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 10;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (targetWeakness.iceWeakness === true) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (targetWeakness.iceTougtness === true) {
          finalDmg = Math.round(finalDmg * 0.5);
        }

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

        info.innerHTML = `${hero.name} used Blizzard dealing ${finalDmg} <span class="ice-type">ice</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    /////////////
    // Blizzara
    addMagicList.addEventListener("click", (event) => {
      if (event.target.classList.contains("sorcerer-blizzara-magic")) {
        const targets = [
          {
            name: "holy-knight",
            get hp() {
              return hkHp;
            },
            set hp(value) {
              hkHp = value;
            },
            element: holyKnightHp,
            weakness: monsterWeakness.holyKnight.Weaknesses,
          },
          {
            name: "ancient-dragon",
            get hp() {
              return drgHp;
            },
            set hp(value) {
              drgHp = value;
            },
            element: dragonHp,
            weakness: monsterWeakness.ancientDragon.Weaknesses,
          },
          {
            name: "crucible-knight",
            get hp() {
              return ckHp;
            },
            set hp(value) {
              ckHp = value;
            },
            element: crucibleKnightHp,
            weakness: monsterWeakness.crucibleKnight.Weaknesses,
          },
        ];

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let message = "";
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 18) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 18;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        const dealDamage = (target) => {
          let playerDmg = magicSpells(45, 60);
          let finalDmg = playerDmg;

          if (target.weakness.iceWeakness === true) {
            finalDmg = Math.round(finalDmg * 1.5);
          } else if (target.weakness.iceTougtness === true) {
            finalDmg = Math.round(finalDmg * 0.5);
          }

          target.hp -= finalDmg;
          if (target.hp < 0) {
            target.hp = 0;
          }
          target.element.innerHTML = `HP: ${target.hp}`;

          message += `${hero.name} used Blizzara dealing ${finalDmg} <span class="ice-type">ice</span> damage to ${target.name} <br>`;
          return finalDmg;
        };

        const attackEnemies = () => {
          targets.forEach((target) => {
            dealDamage(target);
          });
        };

        attackEnemies();

        info.innerHTML = message;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    /////////
    // Blizzaga
    addMagicList.addEventListener("click", (event) => {
      if (event.target.classList.contains("sorcerer-blizzaga-magic")) {
        const targets = [
          {
            name: "holy-knight",
            get hp() {
              return hkHp;
            },
            set hp(value) {
              hkHp = value;
            },
            element: holyKnightHp,
            weakness: monsterWeakness.holyKnight.Weaknesses,
          },
          {
            name: "ancient-dragon",
            get hp() {
              return drgHp;
            },
            set hp(value) {
              drgHp = value;
            },
            element: dragonHp,
            weakness: monsterWeakness.ancientDragon.Weaknesses,
          },
          {
            name: "crucible-knight",
            get hp() {
              return ckHp;
            },
            set hp(value) {
              ckHp = value;
            },
            element: crucibleKnightHp,
            weakness: monsterWeakness.crucibleKnight.Weaknesses,
          },
        ];

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let message = "";
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 25) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 25;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        const dealDamage = (target) => {
          let playerDmg = magicSpells(70, 120);
          let finalDmg = playerDmg;

          if (target.weakness.iceWeakness === true) {
            finalDmg = Math.round(finalDmg * 1.5);
          } else if (target.weakness.iceTougtness === true) {
            finalDmg = Math.round(finalDmg * 0.5);
          }

          target.hp -= finalDmg;
          if (target.hp < 0) {
            target.hp = 0;
          }
          target.element.innerHTML = `HP: ${target.hp}`;

          message += `${hero.name} used Blizzaga dealing ${finalDmg} <span class="ice-type">ice</span> damage to ${target.name} <br>`;
          return finalDmg;
        };

        const attackEnemies = () => {
          targets.forEach((target) => {
            dealDamage(target);
          });
        };

        attackEnemies();

        info.innerHTML = message;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ///////////
    // Thunder
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("sorcerer-thunder-magic")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(25, 40);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 10) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 10;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (targetWeakness.thunderWeakness === true) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (targetWeakness.thunderTougtness === true) {
          finalDmg = Math.round(finalDmg * 0.5);
        }

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

        info.innerHTML = `${hero.name} used Thunder dealing ${finalDmg} <span class="thunder-type">thunder</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ///////////
    // Thundara
    addMagicList.addEventListener("click", (event) => {
      if (event.target.classList.contains("sorcerer-thundara-magic")) {
        const targets = [
          {
            name: "holy-knight",
            get hp() {
              return hkHp;
            },
            set hp(value) {
              hkHp = value;
            },
            element: holyKnightHp,
            weakness: monsterWeakness.holyKnight.Weaknesses,
          },
          {
            name: "ancient-dragon",
            get hp() {
              return drgHp;
            },
            set hp(value) {
              drgHp = value;
            },
            element: dragonHp,
            weakness: monsterWeakness.ancientDragon.Weaknesses,
          },
          {
            name: "crucible-knight",
            get hp() {
              return ckHp;
            },
            set hp(value) {
              ckHp = value;
            },
            element: crucibleKnightHp,
            weakness: monsterWeakness.crucibleKnight.Weaknesses,
          },
        ];

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let message = "";
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 18) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 18;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        const dealDamage = (target) => {
          let playerDmg = magicSpells(45, 60);
          let finalDmg = playerDmg;

          if (target.weakness.thunderWeakness === true) {
            finalDmg = Math.round(finalDmg * 1.5);
          } else if (target.weakness.thunderTougtness === true) {
            finalDmg = Math.round(finalDmg * 0.5);
          }

          target.hp -= finalDmg;
          if (target.hp < 0) {
            target.hp = 0;
          }
          target.element.innerHTML = `HP: ${target.hp}`;

          message += `${hero.name} used Thundara dealing ${finalDmg} <span class="thunder-type">thunder</span> damage to ${target.name} <br>`;
          return finalDmg;
        };

        const attackEnemies = () => {
          targets.forEach((target) => {
            dealDamage(target);
          });
        };

        attackEnemies();

        info.innerHTML = message;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ///////////
    // Thundaga
    addMagicList.addEventListener("click", (event) => {
      if (event.target.classList.contains("sorcerer-thundaga-magic")) {
        const targets = [
          {
            name: "holy-knight",
            get hp() {
              return hkHp;
            },
            set hp(value) {
              hkHp = value;
            },
            element: holyKnightHp,
            weakness: monsterWeakness.holyKnight.Weaknesses,
          },
          {
            name: "ancient-dragon",
            get hp() {
              return drgHp;
            },
            set hp(value) {
              drgHp = value;
            },
            element: dragonHp,
            weakness: monsterWeakness.ancientDragon.Weaknesses,
          },
          {
            name: "crucible-knight",
            get hp() {
              return ckHp;
            },
            set hp(value) {
              ckHp = value;
            },
            element: crucibleKnightHp,
            weakness: monsterWeakness.crucibleKnight.Weaknesses,
          },
        ];

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let message = "";
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 25) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 25;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        const dealDamage = (target) => {
          let playerDmg = magicSpells(70, 120);
          let finalDmg = playerDmg;

          if (target.weakness.thunderWeakness === true) {
            finalDmg = Math.round(finalDmg * 1.5);
          } else if (target.weakness.thunderTougtness === true) {
            finalDmg = Math.round(finalDmg * 0.5);
          }

          target.hp -= finalDmg;
          if (target.hp < 0) {
            target.hp = 0;
          }
          target.element.innerHTML = `HP: ${target.hp}`;

          message += `${hero.name} used Thundaga dealing ${finalDmg} <span class="thunder-type">thunder</span> damage to ${target.name} <br>`;
          return finalDmg;
        };

        const attackEnemies = () => {
          targets.forEach((target) => {
            dealDamage(target);
          });
        };

        attackEnemies();

        info.innerHTML = message;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////
    // Gravity
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("sorcerer-gravity-magic")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(70, 110);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 50) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 50;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (targetWeakness.magicWeakness === true) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (targetWeakness.magicTougtness === true) {
          finalDmg = Math.round(finalDmg * 0.5);
        }

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

        info.innerHTML = `${hero.name} used Gravity dealing ${finalDmg} <span class="magic-type">magic</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ///////////
    // Graviga
    addMagicList.addEventListener("click", (event) => {
      if (event.target.classList.contains("sorcerer-graviga-magic")) {
        const targets = [
          {
            name: "holy-knight",
            get hp() {
              return hkHp;
            },
            set hp(value) {
              hkHp = value;
            },
            element: holyKnightHp,
            weakness: monsterWeakness.holyKnight.Weaknesses,
          },
          {
            name: "ancient-dragon",
            get hp() {
              return drgHp;
            },
            set hp(value) {
              drgHp = value;
            },
            element: dragonHp,
            weakness: monsterWeakness.ancientDragon.Weaknesses,
          },
          {
            name: "crucible-knight",
            get hp() {
              return ckHp;
            },
            set hp(value) {
              ckHp = value;
            },
            element: crucibleKnightHp,
            weakness: monsterWeakness.crucibleKnight.Weaknesses,
          },
        ];

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let message = "";
        let info = document.querySelector(".info-display");

        if (hero) {
          if (hero.mp < 100) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 100;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        const dealDamage = (target) => {
          let playerDmg = magicSpells(150, 300);
          let finalDmg = playerDmg;

          if (target.weakness.thunderWeakness === true) {
            finalDmg = Math.round(finalDmg * 1.5);
          } else if (target.weakness.thunderTougtness === true) {
            finalDmg = Math.round(finalDmg * 0.5);
          }

          target.hp -= finalDmg;
          if (target.hp < 0) {
            target.hp = 0;
          }
          target.element.innerHTML = `HP: ${target.hp}`;

          message += `${hero.name} used Graviga dealing ${finalDmg} <span class="magic-type">magic</span> damage to ${target.name} <br>`;
          return finalDmg;
        };

        const attackEnemies = () => {
          targets.forEach((target) => {
            dealDamage(target);
          });
        };

        attackEnemies();

        info.innerHTML = message;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ///////////
    // Zestaw skilli Spellblade
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      if (event.target.classList.contains("spellblade-focus")) {
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        let info = document.querySelector(".info-display");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero.mp === hero.maxMp) {
          info.innerHTML = `${hero.name} have max mana!`;
          info.style.opacity = "1";
          setTimeout(() => {
            info.style.opacity = "0";
          }, 1000);
          return;
        }

        if (hero) {
          hero.mp += 25;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        info.innerHTML = `${hero.name} recovered 25 MP`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
      }
    });
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("spellblade-normal-attack")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }

        let playerDmg = normalStrongAttack(15, 18);

        if (buffEnhance === true) {
          playerDmg = Math.round((playerDmg *= 1.4));
          buffEnhance = false;
        }

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

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 10;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used normal attack dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    //////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("spellblade-strong-attack")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }

        let playerDmg = normalStrongAttack(20, 25);

        if (buffEnhance === true) {
          playerDmg = Math.round((playerDmg *= 1.4));
          buffEnhance = false;
        }

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

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 5;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used strong attack dealing ${playerDmg} dmg!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
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

        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

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

        let info = document.querySelector(".info-display");
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

        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

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

        let info = document.querySelector(".info-display");
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
      if (event.target.classList.contains("flame-slash")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(35, 50);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 15) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 15;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (targetWeakness.fireWeakness === true) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (targetWeakness.fireTougtness === true) {
          finalDmg = Math.round(finalDmg * 0.5);
        }

        if (buffEnhance === true) {
          finalDmg = Math.round((finalDmg *= 1.4));
          buffEnhance = false;
        }

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

        info.innerHTML = `${hero.name} used Flame slash dealing ${finalDmg} <span class="fire-type">fire</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////
    // Ice slash
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("ice-slash")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(35, 50);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 15) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 15;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (targetWeakness.iceWeakness === true) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (targetWeakness.iceTougtness === true) {
          finalDmg = Math.round(finalDmg * 0.5);
        }

        if (buffEnhance === true) {
          finalDmg = Math.round((finalDmg *= 1.4));
          buffEnhance = false;
        }

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

        info.innerHTML = `${hero.name} used Ice slash dealing ${finalDmg} <span class="ice-type">ice</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////
    // Elemental dance
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("elemental-dance")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(50, 80);
        let finalDmg = playerDmg;

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

        if (
          targetWeakness.iceWeakness === true &&
          targetWeakness.fireWeakness === true
        ) {
          finalDmg = Math.round(finalDmg * 2.0);
        } else if (
          (targetWeakness.fireWeakness === true &&
            targetWeakness.iceWeakness === false,
          targetWeakness.iceTougtness === false ||
            (targetWeakness.iceWeakness === true &&
              targetWeakness.fireWeakness === false),
          targetWeakness.fireTougtness === false)
        ) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (
          (targetWeakness.iceWeakness === true &&
            targetWeakness.fireTougtness === true) ||
          (targetWeakness.fireWeakness === true &&
            targetWeakness.iceTougtness === true)
        ) {
          finalDmg = Math.round(finalDmg * 1.0);
        } else if (
          targetWeakness.fireTougtness === true &&
          targetWeakness.iceTougtness === true
        ) {
          finalDmg = Math.round(finalDmg * 0.2);
        }

        if (buffEnhance === true) {
          finalDmg = Math.round((finalDmg *= 1.4));
          buffEnhance = false;
        }

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

        info.innerHTML = `${hero.name} used Elemental Dance dealing ${finalDmg} <span class="ice-type">ice</span> and <span class="fire-type">fire</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////
    // Fire Tornado
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("fire-tornado")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(50, 80);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 25) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 25;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (targetWeakness.fireWeakness === true) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (targetWeakness.fireTougtness === true) {
          finalDmg = Math.round(finalDmg * 0.5);
        }

        if (buffEnhance === true) {
          finalDmg = Math.round((finalDmg *= 1.4));
          buffEnhance = false;
        }

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

        info.innerHTML = `${hero.name} used Fire Tornado dealing ${finalDmg} <span class="fire-type">fire</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////
    // Ice Tornado
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("ice-tornado")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(50, 80);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 25) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 25;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (targetWeakness.iceWeakness === true) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (targetWeakness.iceTougtness === true) {
          finalDmg = Math.round(finalDmg * 0.5);
        }

        if (buffEnhance === true) {
          finalDmg = Math.round((finalDmg *= 1.4));
          buffEnhance = false;
        }

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

        info.innerHTML = `${hero.name} used Ice Tornado dealing ${finalDmg} <span class="ice-type">ice</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ////////////
    // Elemental dance
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("elemental-tornado")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }
        let targetElement;
        let targetWeakness;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            targetWeakness = monsterWeakness.holyKnight.Weaknesses;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            targetWeakness = monsterWeakness.ancientDragon.Weaknesses;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            targetWeakness = monsterWeakness.crucibleKnight.Weaknesses;
            break;
        }

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        let weaknessType = monsterWeakness;
        let playerDmg = magicSpells(120, 250);
        let finalDmg = playerDmg;

        let info = document.querySelector(".info-display");
        if (hero) {
          if (hero.mp < 50) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 50;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        if (
          targetWeakness.iceWeakness === true &&
          targetWeakness.fireWeakness === true
        ) {
          finalDmg = Math.round(finalDmg * 2.0);
        } else if (
          (targetWeakness.fireWeakness === true &&
            targetWeakness.iceWeakness === false,
          targetWeakness.iceTougtness === false ||
            (targetWeakness.iceWeakness === true &&
              targetWeakness.fireWeakness === false),
          targetWeakness.fireTougtness === false)
        ) {
          finalDmg = Math.round(finalDmg * 1.5);
        } else if (
          (targetWeakness.iceWeakness === true &&
            targetWeakness.fireTougtness === true) ||
          (targetWeakness.fireWeakness === true &&
            targetWeakness.iceTougtness === true)
        ) {
          finalDmg = Math.round(finalDmg * 1.0);
        } else if (
          targetWeakness.fireTougtness === true &&
          targetWeakness.iceTougtness === true
        ) {
          finalDmg = Math.round(finalDmg * 0.2);
        }

        if (buffEnhance === true) {
          finalDmg = Math.round((finalDmg *= 1.4));
          buffEnhance = false;
        }

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

        info.innerHTML = `${hero.name} used Elemental Tornado dealing ${finalDmg} <span class="ice-type">ice</span> and <span class="fire-type">fire</span> damage!`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    ///////////
    // Zestaw umiejętności Druid
    // Focus
    addfocusButton.addEventListener("click", (event) => {
      if (event.target.classList.contains("druid-focus")) {
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        let info = document.querySelector(".info-display");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero.mp === hero.maxMp) {
          info.innerHTML = `${hero.name} have max mana!`;
          info.style.opacity = "1";
          setTimeout(() => {
            info.style.opacity = "0";
          }, 1000);
          return;
        }

        if (hero) {
          hero.mp += 25;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        info.innerHTML = `${hero.name} recovered 25 MP`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);
      }
    });
    // normal attack
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("druid-normal-attack")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }

        let playerDmg = normalStrongAttack(10, 18);

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

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 8;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used normal attack dealing ${playerDmg}`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    //////////////
    // strong attack
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("druid-strong-attack")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }

        let playerDmg = normalStrongAttack(15, 24);

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

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          hero.mp += 6;

          if (hero.mp > hero.maxMp) {
            hero.mp = hero.maxMp;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used strong attack dealing ${playerDmg}`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
    });

    //////////////
    // Thorns
    addSkillsList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("thorns")) {
        await selectTarget();

        if (!selectTarget) {
          return;
        }

        let targetElement;

        switch (selectedTarget) {
          case "holy-knight":
            targetElement = holyKnightHp;
            break;
          case "ancient-dragon":
            targetElement = dragonHp;
            break;
          case "crucible-knight":
            targetElement = crucibleKnightHp;
            break;
        }

        let playerDmg = normalStrongAttack(30, 40);

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

        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");

        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          if (hero.mp < 5) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 5;
          }
          heroMPElement.textContent = `MP: ${hero.mp}`;
        }

        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used Thorns dealing ${playerDmg}`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTarget();
      }
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
      if (event.target.id.includes("druid-cure-spell")) {
        // Umożliw wybór celu leczenia
        await selectHealerTarget();
        console.log(selectHealerTarget());
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);

        if (hero) {
          if (hero.mp < 15) {
            info.innerHTML = `Not enough mana!`;
            info.style.opacity = "1";
            setTimeout(() => {
              info.style.opacity = "0";
            }, 1000);
            return;
          } else {
            hero.mp -= 15;
          }

          heroMPElement.textContent = `MP: ${hero.mp}`;
        }
        console.log(hero);
        let healingValue = healingSpells(30, 50);

        const targetHero = heroes.find(
          (hero) => hero.id === selectedHealerTarget
        );
        if (targetHero) {
          targetHero.hp += healingValue;
          if (targetHero.hp > targetHero.maxHp) {
            targetHero.hp = targetHero.maxHp; // Zapewnij, że HP nie przekroczy maksymum
          }
          console.log(targetHero);
          const targetHeroHPElement = document.querySelector(
            `.player-block[data-hero-id="${selectedHealerTarget}"] .hp-amount`
          );
          targetHeroHPElement.innerHTML = `HP: ${targetHero.hp}`;

          let info = document.querySelector(".info-display");
          info.innerHTML = `${hero.name} used Cure and healed ${healingValue} HP to ${targetHero.name}`;
          info.style.opacity = "1";
          setTimeout(() => {
            info.style.opacity = "0";
          }, 2000);
        }

        hideHealerTargetSelection();
      }
    });

    /////////
    /// logika leczenia
    let selectedHealerTarget = null;

    async function selectHealerTarget() {
      return new Promise((resolve) => {
        const healerTargetButtons = document.querySelectorAll(`.hero-select`);

        // Wyświetl przyciski wyboru bohatera
        healerTargetButtons.forEach((button) => {
          button.style.display = "block"; // pokaż przyciski

          button.addEventListener("click", (event) => {
            selectedHealerTarget = event.target.getAttribute("data-hero-id");
            resolve(selectedHealerTarget);
            hideHealerTargetSelection(); // ukryj przyciski
          });
        });
      });
    }

    function hideHealerTargetSelection() {
      const healerTargetButtons = document.querySelectorAll(".hero-select");

      healerTargetButtons.forEach((button) => {
        button.style.display = "none"; // ukryj przyciski
      });
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
  if (playerBlock) {
    playerSection.removeChild(playerBlock);
    selectedButtons.delete(heroId);
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
      default:
        console.log("Error with button id");
        return;
    }

    button.dataset.heroId = heroId;
    toggleButton(button);
  });
});

let selectedTarget = null;

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

function findHeroById(id) {
  return heroes.find((hero) => hero.id === id);
}

function showSelectTarget() {
  const targetButtons = document.querySelectorAll(".target");

  targetButtons.forEach((button) => {
    button.style.display = "block";
  });
}
function hideSelectTarget() {
  const targetButtons = document.querySelectorAll(".target");

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
