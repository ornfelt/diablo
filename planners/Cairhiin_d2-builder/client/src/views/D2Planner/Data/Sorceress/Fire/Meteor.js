const Meteor = {
  id: "t1r5c2",
  name: "Meteor",
  description: "Summons a meteor from the heavens to smite the enemies",
  data: {
    "Fire Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * Meteor.dependencies[0].value + dlvl[1] * Meteor.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 23*slvl + 57;
      let max = 25*slvl + 75;
      if (slvl > 28) { min = 83*slvl - 811; max = 85*slvl - 793; };
      if (slvl > 22) { min = 81*slvl - 755; max = 83*slvl - 737; };
      if (slvl > 16) { min = 79*slvl - 711; max = 81*slvl - 69; };
      if (slvl > 8) { min = 39*slvl - 71; max = 41*slvl - 53; };
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Average Fire Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[2] * Meteor.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 32*slvl + 88;
      let max = 32*slvl + 168;
      if (slvl > 16) { min = 48*slvl - 104; max = 48*slvl - 24; }
      if (slvl > 8) { min = 40*slvl + 24; max = 40*slvl + 104; }
      return { min: dmgMultiplier*min * 3 * 25/256, max: dmgMultiplier*max * 3 * 25/256 };
    },
    "Mana Cost": () => 2.5,
    "Radius": () => 4,
    "Duration": slvl => Math.floor((14 + (15*slvl)) / 25)
  },
  dependencies: [
      {
        id: "t1r1c2",
        name: "Fire Bolt",
        description: "+{V}% Fire Damage per level",
        value: 5
      },
      {
        id: "t1r3c2",
        name: "Fire Ball",
        description: "+{V}% Fire Damage per level",
        value: 5
      },
      {
        id: "t1r2c1",
        name: "Inferno",
        description: "+{V}% Average Fire Damage per level",
        value: 3
      }
    ]
};

export default Meteor;
