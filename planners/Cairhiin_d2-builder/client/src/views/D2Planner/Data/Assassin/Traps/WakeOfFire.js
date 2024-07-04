const WakeOfFire = {
  id: "t1r3c2",
  name: "Wake of Fire",
  description: "The Assassin drops a trap at her location that sends out small waves of fire around it, dealing damage to enemies caught in the waves",
  data: {
    "Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * WakeOfFire.dependencies[0].value +
        dlvl[1] * WakeOfFire.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (2*slvl) + 3;
      let max = (2*slvl) + 8;
      if (slvl > 28)  { min = (9*slvl) - 137; max = (10*slvl) - 148; }
      if (slvl > 22)  { min = (7*slvl) - 81; max = (8*slvl) - 92; }
      if (slvl > 16)  { min = (5*slvl) - 37	; max = (6*slvl) - 48; }
      if (slvl > 8) { min = (3*slvl) - 5; max = 3*slvl; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": () => 13
  },
  dependencies: [
    {
      id: "t1r1c2",
      name: "Fire Blast",
      description: "+{V}% Fire Damage per level",
      value: 8
    },
    {
      id: "t1r5c2",
      name: "Wake of Inferno",
      description: "+{V}% Fire Damage per level",
      value: 8
    }
  ]
};

export default WakeOfFire;
