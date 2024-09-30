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
          let playerDmg = calculateDmg(45, 60);
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
          let playerDmg = calculateDmg(70, 120);
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
          let playerDmg = calculateDmg(45, 60);
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
          let playerDmg = calculateDmg(70, 120);
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
          let playerDmg = calculateDmg(45, 60);
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
          let playerDmg = calculateDmg(70, 120);
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
          let playerDmg = calculateDmg(150, 300);
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
        let targetWeakness = selectMonsterWeakness(selectedTarget);
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
      createAbilityMagic(
        event,
        "flame-slash",
        35,
        50,
        "fire",
        15,
        null,
        "fire",
        "fire-type"
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
        "ice-type"
      );
    });

    ////////////
    // Elemental dance
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("elemental-dance")) {
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

        let weaknessType = monsterWeakness;
        let playerDmg = calculateDmg(50, 80);
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
      createAbilityMagic(
        event,
        "fire-tornado",
        50,
        80,
        "fire",
        25,
        null,
        "fire",
        "fire-type"
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
        "ice-type"
      );
    });

    ////////////
    // Elemental dance
    addMagicList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("elemental-tornado")) {
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

        let weaknessType = monsterWeakness;
        let playerDmg = calculateDmg(120, 250);
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
      if (event.target.classList.contains("druid-cure")) {
        // await selectTargetHero();

        const test = await selectTargetHero();
        console.log(test);
        const playerBlock = event.target.closest(".player-block");
        const heroId = playerBlock.getAttribute("data-hero-id");
        const heroMPElement = playerBlock.querySelector(".mp-amount");
        const heroHPElement = playerBlock.querySelector(".hp-amount");
        const hero = heroes.find((hero) => hero.id === heroId);
        console.log(hero);
        let chosenHero;
        if ((chosenHero = document.getElementById("player-1"))) {
          chosenHero = hero.id;
        }
        console.log(chosenHero);

        let targetHp;

        switch (selectedTarget) {
          case "player-1":
            targetHp = hero.hp;
            break;
          case "player-2":
            targetHp = hero.hp;
            break;
          case "player-3":
            targetHp = hero.hp;
            break;
          case "player-4":
            targetHp = hero.hp;
            break;
        }
        console.log(targetHp);
        console.log(selectedTarget);
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

        let healingValue = healingSpells(30, 50);

        hero.hp += healingValue;
        console.log(healingValue);
        heroHPElement.innerHTML = `HP: ${hero.hp}`;
        console.log(hero.hp);
        let info = document.querySelector(".info-display");
        info.innerHTML = `${hero.name} used Cure healed ${healingValue}`;
        info.style.opacity = "1";
        setTimeout(() => {
          info.style.opacity = "0";
        }, 2000);

        hideSelectTargetHero();
      }
    });

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

        reduceMana(hero, heroMPElement, mp);

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
      elementColor
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
        reduceMana(hero, heroMPElement, mp);

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
      console.log(typeWeakness[element]);
      console.log(typeTougthness[element]);
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
        selectedTarget = event.target.getAttribute("id");
        console.log(selectedTarget);
        // resolve(selectedTarget);
      });
    });
  });
}
function findHeroById(id) {
  return heroes.find((hero) => hero.id === id);
}

function showSelectTargetHero() {
  const targetButtons = document.querySelectorAll(".hero-select");

  targetButtons.forEach((button) => {
    button.style.display = "block";
  });
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
