import {
  updateCkHp,
  updateDrgHp,
  updateHkHp,
  cura,
  ckHp,
  hkHp,
  drgHp,
} from "./ulepszona.js";

export const monsterWeakness = {
  holyKnight: {
    Weaknesses: {
      iceWeakness: false,
      earthWeakness: true,
      windWeakness: true,
      fireWeakness: true,
      magicWeakness: false,
      thunderWeakness: false,
      magicTougtness: true,
      thunderTougtness: true,
      fireTougtness: false,
      earthTougtness: false,
      windTougtness: false,
      iceTougtness: false,
    },
  },
  crucibleKnight: {
    Weaknesses: {
      iceWeakness: false,
      earthWeakness: false,
      windWeakness: true,
      fireWeakness: false,
      magicWeakness: true,
      thunderWeakness: true,
      magicTougtness: false,
      thunderTougtness: false,
      fireTougtness: true,
      earthTougtness: true,
      windTougtness: false,
      iceTougtness: true,
    },
  },
  ancientDragon: {
    Weaknesses: {
      iceWeakness: true,
      earthWeakness: false,
      windWeakness: false,
      fireWeakness: false,
      magicWeakness: true,
      thunderWeakness: false,
      magicTougtness: false,
      thunderTougtness: true,
      fireTougtness: true,
      earthTougtness: false,
      windTougtness: true,
      iceTougtness: false,
    },
  },
};

// Holy Knight set up

function attackOne() {
  let knightDmg;
  knightDmg = Math.round(Math.random() * (15 - 8) + 8);
  return knightDmg;
}
let healing;
function healAll() {
  healing = Math.round(Math.random() * (300 - 100) + 100);
  updateHkHp(healing);
  updateCkHp(healing);
  updateDrgHp(healing);
  return healing;
}
function attackStrong() {
  let knightDmg;
  knightDmg = Math.round(Math.random() * (25 - 15) + 15);
  return knightDmg;
}

// Crucible Knight set up

function crucibleAttack() {
  let crucibleDmg;
  crucibleDmg = Math.round(Math.random() * (20 - 11) + 11);
  return crucibleDmg;
}
function crucibleBlast() {
  let crucibleDmg;
  crucibleDmg = Math.round(Math.random() * (25 - 10) + 10);
  return crucibleDmg;
}
function crucibleBuff() {}
function crucibleStrong() {
  let crucibleDmg;
  crucibleDmg = Math.round(Math.random() * (35 - 20) + 20);
  return crucibleDmg;
}

// Dragon set up

function dragonAttack() {
  let dragonDmg;
  dragonDmg = Math.round(Math.random() * (25 - 15) + 15);
  return dragonDmg;
}
function dragonBreath() {
  let dragonDmg;
  dragonDmg = Math.round(Math.random() * (30 - 10) + 10);
  return dragonDmg;
}
function dragonStomp() {
  let dragonDmg;
  dragonDmg = Math.round(Math.random() * (35 - 20) + 20);
  return dragonDmg;
}
function dragonRoar() {}
function dragonLaser() {
  let dragonDmg;
  dragonDmg = Math.round(Math.random() * (50 - 40) + 40);
  return dragonDmg;
}

// Zestawy działania ataków
export function holyKnightSkills(holyKnightHp, crucibleKnightHp, dragonHp) {
  let knightMove;
  const randomizer = Math.random();
  let info = document.querySelector(".info-display");

  if (randomizer >= 0 && randomizer < 1 / 3) {
    knightMove = attackOne();
    console.log(knightMove, "knightMove NA");
    info.innerHTML = `Holy knight used normal attack!`;
    info.style.opacity = "1";
    setTimeout(() => {
      info.style.opacity = "0";
    }, 2000);
    return knightMove;
  } else if (randomizer > 1 / 3 && randomizer < 2 / 3) {
    cura.apply = true;
    healAll();
    holyKnightHp.innerHTML = `HP: ${hkHp}`;
    crucibleKnightHp.innerHTML = `HP: ${ckHp}`;
    dragonHp.innerHTML = `HP: ${drgHp}`;
    info.innerHTML = `Holy knight used Cura! Recovering ${healing} to all enemies!`;
    info.style.opacity = "1";
    setTimeout(() => {
      info.style.opacity = "0";
    }, 2000);
    return knightMove;
  } else if (randomizer > 2 / 3 && randomizer <= 1) {
    knightMove = attackStrong();
    console.log(knightMove, "knightMove SA");
    info.innerHTML = `Holy knight used strong attack!`;
    info.style.opacity = "1";
    setTimeout(() => {
      info.style.opacity = "0";
    }, 2000);
    return knightMove;
  }
}

function crucibleKnightSkills() {
  let crucibleMove;
  const randomizer = Math.random();

  if (randomizer >= 0 && randomizer < 1 / 4) {
    crucibleMove = crucibleAttack();
    return crucibleMove;
  } else if (randomizer > 1 / 4 && randomizer < 2 / 4) {
    crucibleMove = crucibleBlast();
    return crucibleMove;
  } else if (randomizer > 2 / 4 && randomizer < 3 / 4) {
    crucibleMove = crucibleBuff();
    return crucibleMove;
  } else if (randomizer > 3 / 4 && randomizer <= 1) {
    crucibleMove = crucibleStrong();
    return crucibleMove;
  }
}

function ancientDragonSkills() {
  let dragonMove;
  const randomizer = Math.random();

  if (randomizer >= 0 && randomizer < 1 / 5) {
    dragonMove = dragonAttack();
    return dragonMove;
  } else if (randomizer > 1 / 5 && randomizer < 2 / 5) {
    dragonMove = dragonBreath();
    return dragonMove;
  } else if (randomizer > 2 / 5 && randomizer < 3 / 5) {
    dragonMove = dragonStomp();
    return dragonMove;
  } else if (randomizer > 3 / 5 && randomizer < 4 / 5) {
    dragonMove = dragonRoar();
    return dragonMove;
  } else if (randomizer > 4 / 5 && randomizer <= 1) {
    dragonMove = dragonLaser();
    return dragonMove;
  }
}
