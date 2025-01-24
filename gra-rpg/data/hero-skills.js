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
      <button class="all-skills-style">Normal attack</button>
      <p class="skill-magic-description">MP + 7</p>

      <button class="all-skills-style">Strong attack</button>
      <p class="skill-magic-description">MP + 4</p>

      <button class="all-skills-style">Protect the weak!</button>
      <p class="skill-magic-description">Takes dmg insted of ally MP - 8</p>

      <button class="all-skills-style">Shield up!</button>
      <p class="skill-magic-description">Increase all ally dmg reduction (+25%) MP - 13</p>
      
    `,
    magicList: `
      <button class="all-skills-style">Cura</button>
      <p class="skill-magic-description">Heal all ally MP - 30</p>

      <button class="all-skills-style">Protectga</button>
      <p class="skill-magic-description">Increase all ally dmg reduction (+50%) MP - 15</p>

      <button class="all-skills-style">Def Down</button>
      <p class="skill-magic-description">Decrease one enemy def (-30%) MP - 10</p>

      <button class="all-skills-style">Holy Sword</button>
      <p class="skill-magic-description">Deal minor <span class=magic-type">magic</span> dmg MP - 15</p>

      <button class="all-skills-style">Justice!</button>
      <p class="skill-magic-description">Deal large <span class=magic-type">magic</span> dmg MP - 25</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button defender-focus">Focus</button>`,
  };
  healer = {
    skillsList: `
      <button class="all-skills-style unlock-blocked4 healer-normal-attack">Normal attack</button>
      <p class="skill-magic-description">MP + 5</p>

      <button class="all-skills-style unlock-blocked4 healer-strong-attack">Strong attack</button>
      <p class="skill-magic-description">MP + 2</p>

      <button class="all-skills-style pray">Pray</button>
      <p class="skill-magic-description">MP + 50</p>
      
    `,
    magicList: `
      <button class="all-skills-style unlock-blocked4 healer-cure">Cure</button>
      <p class="skill-magic-description">Heal one ally MP - 15</p>

      <button class="all-skills-style unlock-blocked4 healer-cura">Cura</button>
      <p class="skill-magic-description">Heal all ally MP - 30</p>

      <button class="all-skills-style unlock-blocked4 healer-curaga">Curaga</button>
      <p class="skill-magic-description">Heal one ally MP - 45</p>

      <button class="all-skills-style unlock-blocked4 healer-curaja">Curaja</button>
      <p class="skill-magic-description">Heal all ally MP - 50</p>

      <button class="all-skills-style unlock-blocked4 mana-transfer">Mana Transfer</button>
      <p class="skill-magic-description">Transfer mana to selected ally MP - 30</p>

      <button class="all-skills-style unlock-blocked4 light-arrow">Light Arrow</button>
      <p class="skill-magic-description">Deal small <span class="magic-type">magic</span> dmg to one enemy MP - 10</p>

      <button class="all-skills-style unlock-blocked4 holy">Holy</button>
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
      <button class="all-skills-style druid-normal-attack unlock-blocked3">Normal attack</button>
      <p class="skill-magic-description">MP + 8</p>

      <button class="all-skills-style druid-strong-attack unlock-blocked3">Strong attack</button>
      <p class="skill-magic-description">MP + 6</p>

      <button class="all-skills-style mana-seed">Mana Seed</button>
      <p class="skill-magic-description">Regenerate mana for all ally MP + 35</p>

      <button class="all-skills-style thorns unlock-blocked3">Thorns</button>
      <p class="skill-magic-description">Use tree thorns to deal dmg MP - 5</p>
    `,
    magicList: `
      <button class="all-skills-style unlock-blocked3 druid-cure">Cure</button>
      <p class="skill-magic-description">Heal one ally MP - 15</p>

      <button class="all-skills-style unlock-blocked3 druid-curaja">Curaja</button>
      <p class="skill-magic-description">Heal all ally MP - 50</p>

      <button class="all-skills-style unlock-blocked3 stone">Stone</button>
      <p class="skill-magic-description">Deal small <span class="earth-type">earth</span> dmg to one enemy MP - 10</p>

      <button class="all-skills-style unlock-blocked3 stona">Stona</button>
      <p class="skill-magic-description">Deal minor <span class="earth-type">earth</span> dmg to all enemy MP - 18</p>

      <button class="all-skills-style unlock-blocked3 stonga">Stonga</button>
      <p class="skill-magic-description">Deal large <span class="earth-type">earth</span> dmg to all enemy MP - 25</p>

      <button class="all-skills-style unlock-blocked3 aero">Aero</button>
      <p class="skill-magic-description">Deal small <span class="wind-type">wind</span> dmg to one enemy MP - 10</p>

      <button class="all-skills-style unlock-blocked3 aerora">Aerora</button>
      <p class="skill-magic-description">Deal minor <span class="wind-type">wind</span> dmg to all enemy MP - 18</p>

      <button class="all-skills-style unlock-blocked3 aeroga">Aeroga</button>
      <p class="skill-magic-description">Deal large <span class="wind-type">wind</span> dmg to all enemy MP - 25</p>

      <button class="all-skills-style unlock-blocked3 forest-revenge">Forest revenge</button>
      <p class="skill-magic-description">Deal massive <span class="earth-type">earth</span> and <span class="wind-type">wind</span> dmg to all enemy MP - 70</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button druid-focus">Focus</button>`,
  };
  alchemist = {
    skillsList: `
      <button class="all-skills-style alchemist-normal-attack">Normal attack</button>
      <p class="skill-magic-description">MP + 1</p>

      <button class="all-skills-style implant-aero">Weakness Wind</button>
      <p class="skill-magic-description">Adds <span class="wind-type">wind</span> weakness  MP - 40</p>

      <button class="all-skills-style implant-earth">Weakness Earth</button>
      <p class="skill-magic-description">Adds <span class="earth-type">earth</span> weakness  MP - 40</p>

      <button class="all-skills-style implant-magic">Weakness Magic</button>
      <p class="skill-magic-description">Adds <span class="magic-type">magic</span> weakness  MP - 40</p>

      <button class="all-skills-style implant-thunder">Weakness Thunder</button>
      <p class="skill-magic-description">Adds <span class="thunder-type">thunder</span> weakness  MP - 40</p>

      <button class="all-skills-style mana-bottle">Mana bottle</button>
      <p class="skill-magic-description">Drinks mana mixture MP + 100</p>
    `,
    magicList: `
      <button class="all-skills-style earth-bottle">Earth bottle</button>
      <p class="skill-magic-description">Deal minor <span class="earth-type">earth</span> dmg to all enemies MP - 20</p>

      <button class="all-skills-style wind-bottle">Wind bottle</button>
      <p class="skill-magic-description">Deal minor <span class="wind-type">wind</span> dmg to all enemies MP - 20</p>

      <button class="all-skills-style thunder-bottle">Thunder bottle</button>
      <p class="skill-magic-description">Deal minor <span class="thunder-type">thunder</span> dmg to all enemies MP - 20</p>

      <button class="all-skills-style magic-bottle">Magic bottle</button>
      <p class="skill-magic-description">Deal minor <span class="magic-type">magic</span> dmg to all enemies MP - 20</p>

      <button class="all-skills-style magic-res-up">Magic up</button>
      <p class="skill-magic-description">Increase magic type dmg (+25%) MP - 30</p>

      <button class="all-skills-style strength-up">Strength up</button>
      <p class="skill-magic-description">Increase non magic type dmg (+25%) MP - 30</p>

      <button class="all-skills-style ">Toxic Mist</button>
      <p class="skill-magic-description">Reduce all enemy atk (-50%) MP - 40</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button alchemist-focus">Focus</button>`,
  };
  elementalMaster = {
    skillsList: `
      <button class="all-skills-style elementalMaster-normal-attack unlock-blocked4">Normal attack</button>
      <p class="skill-magic-description">MP + 10</p>

      <button class="all-skills-style elementalMaster-strong-attack unlock-blocked4">Strong attack</button>
      <p class="skill-magic-description">MP + 5</p>

      <button class="all-skills-style absorb-elements ">Absorb Elements</button>
      <p class="skill-magic-description">MP + 80</p>
    `,
    magicList: `
      <button class="all-skills-style blazing-wind">Blazing wind</button>
      <p class="skill-magic-description">Deal minor <span class="fire-type">fire</span> and <span class="wind-type">wind</span> dmg to all enemy MP - 30</p>

      <button class="all-skills-style hard-blast">Hard blast</button>
      <p class="skill-magic-description">Deal minor <span class="earth-type">earth</span> and <span class="magic-type">magic</span> dmg to all enemy MP - 30</p>

      <button class="all-skills-style freezing-spark">Freezing spark</button>
      <p class="skill-magic-description">Deal minor <span class="ice-type">ice</span> and <span class="thunder-type">thunder</span> dmg to all enemy MP - 30</p>

      <button class="all-skills-style cold-snap">Cold snap</button>
      <p class="skill-magic-description">Deal large <span class="ice-type">ice</span> and <span class="magic-type">magic</span> dmg to all enemy MP - 45</p>

      <button class="all-skills-style lava-earthquake">Lava earthquake</button>
      <p class="skill-magic-description">Deal large <span class="fire-type">fire</span> and <span class="earth-type">earth</span> dmg to all enemy MP - 45</p>

      <button class="all-skills-style geo-storm">Geo storm</button>
      <p class="skill-magic-description">Deal large <span class="thunder-type">thunder</span> and <span class="wind-type">wind</span> dmg to all enemy MP - 45</p>

      <button class="all-skills-style all-in-me">All in me!</button>
      <p class="skill-magic-description">Deal gigantic <span class="magic-type">magic</span> dmg to one enemy MP - 200 and leaves hp at 1</p>
    `,
    focusButton: `<button class="all-buttons js-focus-button elementalMaster-focus ">Focus</button>`,
  };
}
