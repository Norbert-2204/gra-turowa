export function normalStrongAttack(min, max) {
  let playerDmg;

  playerDmg = Math.round(Math.random() * (max - min) + min);

  return playerDmg;
}

export function healingSpells(min, max) {
  let healing;

  healing = Math.round(Math.random() * (max - min) + min);
  return healing;
}
export function magicSpells(min, max) {
  let magic;

  magic = Math.round(Math.random() * (max - min) + min);

  return magic;
}
