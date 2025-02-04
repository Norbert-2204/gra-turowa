export class Heroes {
  warrior = {
    skillsList: `
      <button data-skill="warrior-normal-attack" class="all-skills-style js-skills warrior-normal-attack">Normal attack</button>
      <p class="skill-magic-description">MP + 10</p>

      <button data-skill="warrior-strong-attack" class="all-skills-style js-skills warrior-strong-attack">Strong attack</button>
      <p class="skill-magic-description">MP + 5</p>

      <button data-skill="spear-stab" class="all-skills-style js-skills spear-stab">Spear stab</button>
      <p class="skill-magic-description">Stab enemy with a spear MP - 8</p>

      <button data-skill="enrage" class="all-skills-style js-skills enrage">Enrage</button>
      <p class="skill-magic-description">Enrage himself for powerful axe slash MP - 15</p>

      <button data-skill="leap" class="all-skills-style js-skills leap">Leap</button>
      <p class="skill-magic-description">Jumps and use his spear to penetrate enemy MP - 22</p>

      <button data-skill="brutal-takedown" class="all-skills-style js-skills brutal-takedown">Brutal Takedown</button>
      <p class="skill-magic-description">Uses his two axes in furious combo MP - 40</p>
    `,

    magicList: `
      <button class="all-skills-style dmg-boost">Dmg Boost</button>
      <p class="skill-magic-description">Next attack dmg +70% MP - 30</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button warrior-focus">Focus</button>`,
  };
  defender = {
    skillsList: `
      <button data-skill="defender-normal-attack" class="all-skills-style js-skills defender-normal-attack reduce-uCount reduce-pCount reduce-pCount50">Normal attack</button>
      <p class="skill-magic-description">MP + 7</p>

      <button data-skill="defender-strong-attack" class="all-skills-style js-skills defender-strong-attack reduce-uCount reduce-pCount reduce-pCount50">Strong attack</button>
      <p class="skill-magic-description">MP + 4</p>

      <button data-skill="protect-the-weak" class="all-skills-style js-skills protect-the-weak reduce-uCount reduce-pCount reduce-pCount50">Protect the weak!</button>
      <p class="skill-magic-description">Takes dmg insted of ally MP - 8</p>

      <button data-skill="shield-up" class="all-skills-style js-skills shield-up reduce-uCount reduce-pCount reduce-pCount50">Shield up!</button>
      <p class="skill-magic-description">Increase all ally dmg reduction (+25%) MP - 13</p>
      
    `,
    magicList: `
      <button data-skill="defender-cura" class="all-skills-style js-skills defender-cura reduce-uCount reduce-pCount reduce-pCount50">Cura</button>
      <p class="skill-magic-description">Heal all ally MP - 30</p>

      <button data-skill="protectga" class="all-skills-style js-skills protectga reduce-uCount reduce-pCount reduce-pCount50">Protectga</button>
      <p class="skill-magic-description">Increase all ally dmg reduction (+50%) MP - 15</p>

      <button data-skill="def-down" class="all-skills-style js-skills def-down reduce-uCount reduce-pCount reduce-pCount50">Def Down</button>
      <p class="skill-magic-description">Decrease one enemy def (-30%) MP - 10</p>

      <button data-skill="holy-sword" class="all-skills-style js-skills holy-sword reduce-uCount reduce-pCount reduce-pCount50">Holy Sword</button>
      <p class="skill-magic-description">Deal minor <span class=magic-type">magic</span> dmg MP - 15</p>

      <button data-skill="justice" class="all-skills-style js-skills justice reduce-uCount reduce-pCount">Justice!</button>
      <p class="skill-magic-description">Deal large <span class=magic-type reduce-uCount reduce-pCount reduce-pCount50">magic</span> dmg MP - 25</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button defender-focus reduce-uCount reduce-pCount reduce-pCount50">Focus</button>`,
  };
  healer = {
    skillsList: `
      <button data-skill="healer-normal-attack" class="all-skills-style js-skills unlock-blocked4 healer-normal-attack">Normal attack</button>
      <p class="skill-magic-description">MP + 5</p>

      <button data-skill="healer-strong-attack" class="all-skills-style js-skills unlock-blocked4 healer-strong-attack">Strong attack</button>
      <p class="skill-magic-description">MP + 2</p>

      <button data-skill="pray" class="all-skills-style js-skills pray">Pray</button>
      <p class="skill-magic-description">MP + 50</p>
      
    `,
    magicList: `
      <button data-skill="healer-cure" class="all-skills-style js-skills unlock-blocked4 healer-cure">Cure</button>
      <p class="skill-magic-description">Heal one ally MP - 15</p>

      <button data-skill="healer-cura" class="all-skills-style js-skills unlock-blocked4 healer-cura">Cura</button>
      <p class="skill-magic-description">Heal all ally MP - 30</p>

      <button data-skill="healer-curaga" class="all-skills-style js-skills unlock-blocked4 healer-curaga">Curaga</button>
      <p class="skill-magic-description">Heal one ally MP - 45</p>

      <button data-skill="healer-curaja" class="all-skills-style js-skills unlock-blocked4 healer-curaja">Curaja</button>
      <p class="skill-magic-description">Heal all ally MP - 50</p>

      <button data-skill="mana-transfer" class="all-skills-style js-skills unlock-blocked4 mana-transfer">Mana Transfer</button>
      <p class="skill-magic-description">Transfer mana to selected ally MP - 30</p>

      <button data-skill="light-arrow" class="all-skills-style js-skills unlock-blocked4 light-arrow">Light Arrow</button>
      <p class="skill-magic-description">Deal small <span class="magic-type">magic</span> dmg to one enemy MP - 10</p>

      <button data-skill="holy" class="all-skills-style js-skills unlock-blocked4 holy">Holy</button>
      <p class="skill-magic-description">Deal massive <span class="magic-type">magic</span> dmg to one enemy MP - 100</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button healer-focus">Focus</button>`,
  };
  sorcerer = {
    skillsList: `
      <button data-skill="sorcerer-normal-attack" class="all-skills-style sorcerer-normal-attack js-skills unlock-blocked">Normal attack</button>
      <p class="skill-magic-description">MP + 2</p>

      <button data-skill="energy-gathering" class="all-skills-style js-skills energy-gathering">Energy gathering</button>
      <p class="skill-magic-description">MP + 60</p>
    `,
    magicList: `
      <button data-skill="fire" class="all-skills-style js-skills sorcerer-fire-magic unlock-blocked">Fire</button>
      <p class="skill-magic-description">Deal small amount of <span class="fire-type">fire</span> dmg to one enemy MP - 10</p>

      <button data-skill="fira" class="all-skills-style js-skills sorcerer-fira-magic unlock-blocked">Fira</button>
      <p class="skill-magic-description">Deal minor amount of <span class="fire-type">fire</span> dmg to all enemy MP - 18</p>

      <button data-skill="firaga" class="all-skills-style sorcerer-firaga-magic js-skills unlock-blocked" >Firaga</button>
      <p class="skill-magic-description">Deal large amount of <span class="fire-type">fire</span> dmg to all enemy MP - 25</p>

      <button data-skill="blizzard" class="all-skills-style sorcerer-blizzard-magic js-skills unlock-blocked">Blizzard</button>
      <p class="skill-magic-description">Deal small amount of <span class="ice-type">ice</span> dmg to one enemy MP - 10</p>

      <button data-skill="blizzara" class="all-skills-style sorcerer-blizzara-magic js-skills unlock-blocked">Blizzara</button>
      <p class="skill-magic-description">Deal minor amount of <span class="ice-type">ice</span> dmg to all enemy MP - 18</p>

      <button data-skill="blizzaga" class="all-skills-style sorcerer-blizzaga-magic js-skills unlock-blocked">Blizzaga</button>
      <p class="skill-magic-description">Deal large amount of <span class="ice-type">ice</span> dmg to all enemy MP - 25</p>

      <button data-skill="thunder" class="all-skills-style sorcerer-thunder-magic js-skills unlock-blocked">Thunder</button>
      <p class="skill-magic-description">Deal small amount of <span class="thunder-type">thunder</span> dmg to one enemy MP - 10</p>

      <button data-skill="thundara" class="all-skills-style sorcerer-thundara-magic js-skills unlock-blocked">Thundara</button>
      <p class="skill-magic-description">Deal minor amount of <span class="thunder-type">thunder</span> dmg to all enemy MP - 18</p>

      <button data-skill="thundaga" class="all-skills-style sorcerer-thundaga-magic js-skills unlock-blocked">Thundaga</button>
      <p class="skill-magic-description">Deal large amount of <span class="thunder-type">thunder</span> dmg to all enemy MP - 25</p>

      <button data-skill="gravity" class="all-skills-style sorcerer-gravity-magic js-skills unlock-blocked">Gravity</button>
      <p class="skill-magic-description">Deal large amount of <span class="magic-type">magic</span> dmg to one enemy MP - 50</p>

      <button data-skill="graviga" class="all-skills-style sorcerer-graviga-magic js-skills unlock-blocked">Graviga</button>
      <p class="skill-magic-description">Deal massive amount of <span class="magic-type">magic</span> dmg to all enemy MP - 100</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button sorcerer-focus">Focus</button>`,
  };
  spellblade = {
    skillsList: `
      <button data-skill="spellblade-normal-attack" class="all-skills-style unlock-blocked2 js-skills reduce-wCount spellblade-normal-attack">Normal attack</button>
      <p class="skill-magic-description">MP + 10</p>

      <button data-skill="spellblade-strong-attack" class="all-skills-style unlock-blocked2 js-skills reduce-wCount spellblade-strong-attack">Strong attack</button>
      <p class="skill-magic-description">MP + 5</p>

      <button class="all-skills-style unlock-blocked2 js-skills reduce-wCount enhance">Enhance</button>
      <p class="skill-magic-description">Increase next attack dmg (+40%) MP - 20</p>

      <button class="all-skills-style reduce-wCount js-skills meditate">Meditate</button>
      <p class="skill-magic-description">MP + 35</p>

      <button data-skill="implant-fire" class="all-skills-style unlock-blocked2 js-skills reduce-wCount implant-fire">Weakness Fire</button>
      <p class="skill-magic-description">Adds <span class="fire-type">fire</span> weakness  MP - 40</p>

      <button data-skill="implant-ice" class="all-skills-style unlock-blocked2 js-skills reduce-wCount implant-ice">Weakness Ice</button>
      <p class="skill-magic-description">Adds <span class="ice-type">ice</span> weakness  MP - 40</p>
    `,
    magicList: `
      <button data-skill="flame-slash" class="all-skills-style unlock-blocked2 js-skills reduce-wCount flame-slash">Flame Slash</button>
      <p class="skill-magic-description">Deal minor <span class="fire-type">fire</span> dmg MP - 15</p>

      <button data-skill="ice-slash" class="all-skills-style unlock-blocked2 js-skills reduce-wCount ice-slash">Ice Slash</button>
      <p class="skill-magic-description">Deal minor <span class="ice-type">ice</span> dmg MP - 15</p>

      <button data-skill="elemental-dance" class="all-skills-style unlock-blocked2 js-skills reduce-wCount elemental-dance">Elemental Dance</button>
      <p class="skill-magic-description">Deal large <span class="fire-type">fire</span> and <span class="ice-type">ice</span> dmg MP - 30</p>

      <button data-skill="fire-tornado" class="all-skills-style unlock-blocked2 js-skills reduce-wCount fire-tornado">Fire Tornado</button>
      <p class="skill-magic-description">Deal large <span class="fire-type">fire</span> dmg MP - 25</p>

      <button data-skill="ice-tornado" class="all-skills-style unlock-blocked2 js-skills reduce-wCount ice-tornado">Ice Tornado</button>
      <p class="skill-magic-description">Deal large <span class="ice-type">ice</span> dmg MP - 25</p>

      <button data-skill="elemental-tornado" class="all-skills-style unlock-blocked2 js-skills reduce-wCount elemental-tornado">Elemental Tornado</button>
      <p class="skill-magic-description">Deal massive <span class="fire-type">fire</span> and <span class="ice-type">ice</span> dmg MP - 50</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button spellblade-focus">Focus</button>`,
  };
  druid = {
    skillsList: `
      <button data-skill="druid-normal-attack" class="all-skills-style js-skills druid-normal-attack unlock-blocked3">Normal attack</button>
      <p class="skill-magic-description">MP + 8</p>

      <button data-skill="druid-strong-attack" class="all-skills-style js-skills druid-strong-attack unlock-blocked3">Strong attack</button>
      <p class="skill-magic-description">MP + 6</p>

      <button data-skill="mana-seed" class="all-skills-style js-skills mana-seed">Mana Seed</button>
      <p class="skill-magic-description">Regenerate mana for all ally MP + 35</p>

      <button data-skill="thorns" class="all-skills-style js-skills thorns unlock-blocked3">Thorns</button>
      <p class="skill-magic-description">Use tree thorns to deal dmg MP - 5</p>
    `,
    magicList: `
      <button data-skill="druid-cure" class="all-skills-style js-skills unlock-blocked3 druid-cure">Cure</button>
      <p class="skill-magic-description">Heal one ally MP - 15</p>

      <button data-skill="druid-curaja" class="all-skills-style js-skills unlock-blocked3 druid-curaja">Curaja</button>
      <p class="skill-magic-description">Heal all ally MP - 50</p>

      <button data-skill="stone" class="all-skills-style js-skills unlock-blocked3 stone">Stone</button>
      <p class="skill-magic-description">Deal small <span class="earth-type">earth</span> dmg to one enemy MP - 10</p>

      <button data-skill="stona" class="all-skills-style js-skills unlock-blocked3 stona">Stona</button>
      <p class="skill-magic-description">Deal minor <span class="earth-type">earth</span> dmg to all enemy MP - 18</p>

      <button data-skill="stonga" class="all-skills-style js-skills unlock-blocked3 stonga">Stonga</button>
      <p class="skill-magic-description">Deal large <span class="earth-type">earth</span> dmg to all enemy MP - 25</p>

      <button data-skill="aero" class="all-skills-style js-skills unlock-blocked3 aero">Aero</button>
      <p class="skill-magic-description">Deal small <span class="wind-type">wind</span> dmg to one enemy MP - 10</p>

      <button data-skill="aerora" class="all-skills-style js-skills unlock-blocked3 aerora">Aerora</button>
      <p class="skill-magic-description">Deal minor <span class="wind-type">wind</span> dmg to all enemy MP - 18</p>

      <button data-skill="aeroga" class="all-skills-style js-skills unlock-blocked3 aeroga">Aeroga</button>
      <p class="skill-magic-description">Deal large <span class="wind-type">wind</span> dmg to all enemy MP - 25</p>

      <button data-skill="forest-revenge" class="all-skills-style js-skills unlock-blocked3 forest-revenge">Forest revenge</button>
      <p class="skill-magic-description">Deal massive <span class="earth-type">earth</span> and <span class="wind-type">wind</span> dmg to all enemy MP - 70</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button druid-focus">Focus</button>`,
  };
  alchemist = {
    skillsList: `
      <button data-skill="alchemist-normal-attack" class="all-skills-style js-skills alchemist-normal-attack reduce-aCount reduce-dCount reduce-bCount">Normal attack</button>
      <p class="skill-magic-description">MP + 1</p>

      <button data-skill="aero-implant" class="all-skills-style js-skills implant-aero reduce-aCount reduce-dCount reduce-bCount">Weakness Wind</button>
      <p class="skill-magic-description">Adds <span class="wind-type">wind</span> weakness  MP - 40</p>

      <button data-skill="earth-implant" class="all-skills-style js-skills implant-earth reduce-aCount reduce-dCount reduce-bCount">Weakness Earth</button>
      <p class="skill-magic-description">Adds <span class="earth-type">earth</span> weakness  MP - 40</p>

      <button data-skill="magic-implant" class="all-skills-style js-skills implant-magic reduce-aCount reduce-dCount reduce-bCount">Weakness Magic</button>
      <p class="skill-magic-description">Adds <span class="magic-type">magic</span> weakness  MP - 40</p>

      <button data-skill="thunder-implant" class="all-skills-style js-skills implant-thunder reduce-aCount reduce-dCount reduce-bCount">Weakness Thunder</button>
      <p class="skill-magic-description">Adds <span class="thunder-type">thunder</span> weakness  MP - 40</p>

      <button data-skill="mana-bottle" class="all-skills-style js-skills mana-bottle reduce-aCount reduce-dCount reduce-bCount">Mana bottle</button>
      <p class="skill-magic-description">Drinks mana mixture MP + 100</p>
    `,
    magicList: `
      <button data-skill="earth-bottle" class="all-skills-style js-skills earth-bottle reduce-aCount reduce-dCount reduce-bCount">Earth bottle</button>
      <p class="skill-magic-description">Deal minor <span class="earth-type">earth</span> dmg to all enemies MP - 20</p>

      <button data-skill="wind-bottle" class="all-skills-style js-skills wind-bottle reduce-aCount reduce-dCount reduce-bCount">Wind bottle</button>
      <p class="skill-magic-description">Deal minor <span class="wind-type">wind</span> dmg to all enemies MP - 20</p>

      <button data-skill="thunder-bottle" class="all-skills-style js-skills thunder-bottle reduce-aCount reduce-bCount">Thunder bottle</button>
      <p class="skill-magic-description">Deal minor <span class="thunder-type">thunder</span> dmg to all enemies MP - 20</p>

      <button data-skill="magic-bottle" class="all-skills-style js-skills magic-bottle reduce-aCount reduce-dCount reduce-bCount">Magic bottle</button>
      <p class="skill-magic-description">Deal minor <span class="magic-type">magic</span> dmg to all enemies MP - 20</p>

      <button data-skill="damage-up" class="all-skills-style js-skills damage-up reduce-aCount reduce-bCount">Damage up</button>
      <p class="skill-magic-description">Increase damage dealt from all ally (+25%) MP - 30</p>

      <button data-skill="toxic-mist" class="all-skills-style js-skills toxic-mist reduce-aCount reduce-dCount">Toxic Mist</button>
      <p class="skill-magic-description">Reduce all enemy atk (-50%) MP - 40</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button alchemist-focus">Focus</button>`,
  };
  elementalMaster = {
    skillsList: `
      <button data-skill="em-normal-attack" class="all-skills-style js-skills elementalMaster-normal-attack unlock-blocked4">Normal attack</button>
      <p class="skill-magic-description">MP + 10</p>

      <button data-skill="em-strong-attack" class="all-skills-style js-skills elementalMaster-strong-attack unlock-blocked4">Strong attack</button>
      <p class="skill-magic-description">MP + 5</p>

      <button data-skill="absorb-elements" class="all-skills-style js-skills absorb-elements ">Absorb Elements</button>
      <p class="skill-magic-description">MP + 80</p>
    `,
    magicList: `
      <button data-skill="blazing-wind" class="all-skills-style js-skills blazing-wind">Blazing wind</button>
      <p class="skill-magic-description">Deal minor <span class="fire-type">fire</span> and <span class="wind-type">wind</span> dmg to all enemy MP - 30</p>

      <button data-skill="hard-blast" class="all-skills-style js-skills hard-blast">Hard blast</button>
      <p class="skill-magic-description">Deal minor <span class="earth-type">earth</span> and <span class="magic-type">magic</span> dmg to all enemy MP - 30</p>

      <button data-skill="freezing-spark" class="all-skills-style js-skills freezing-spark">Freezing spark</button>
      <p class="skill-magic-description">Deal minor <span class="ice-type">ice</span> and <span class="thunder-type">thunder</span> dmg to all enemy MP - 30</p>

      <button data-skill="cold-snap" class="all-skills-style js-skills cold-snap">Cold snap</button>
      <p class="skill-magic-description">Deal large <span class="ice-type">ice</span> and <span class="magic-type">magic</span> dmg to all enemy MP - 45</p>

      <button data-skill="lava-earthquake" class="all-skills-style js-skills lava-earthquake">Lava earthquake</button>
      <p class="skill-magic-description">Deal large <span class="fire-type">fire</span> and <span class="earth-type">earth</span> dmg to all enemy MP - 45</p>

      <button data-skill="geo-storm" class="all-skills-style js-skills geo-storm">Geo storm</button>
      <p class="skill-magic-description">Deal large <span class="thunder-type">thunder</span> and <span class="wind-type">wind</span> dmg to all enemy MP - 45</p>

      <button data-skill="all-in-me" class="all-skills-style js-skills all-in-me">All in me!</button>
      <p class="skill-magic-description">Deal gigantic <span class="magic-type">magic</span> dmg to one enemy MP - 200 and leaves hp at 1</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button elementalMaster-focus ">Focus</button>`,
  };
}
