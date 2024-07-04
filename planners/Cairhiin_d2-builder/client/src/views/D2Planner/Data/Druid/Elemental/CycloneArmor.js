const CycloneArmor = {
  id: "t3r3c3",
  name: "Cyclone Armor",
  description: "Covers the druid in protective forces that absorb elemental attacks",
  data: {
    "Elemental Damage Absorb": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * CycloneArmor.dependencies[0].value +
          dlvl[1] * CycloneArmor.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      return Math.floor((28 + (12*slvl)) * dmgMultiplier);

    },
    "Mana Cost": slvl => 4+slvl
  },
  dependencies: [
      {
        id: "t3r4c2",
        name: "Twister",
        description: "+{V}% Elemental Damage absorbed per level",
        value: 7
      },
      {
        id: "t3r5c2",
        name: "Tornado",
        description: "+{V}% Elemental Damage absorbed per level",
        value: 7
      },
      {
        id: "t3r6c2",
        name: "Hurricane",
        description: "+{V}% Elemental Damage absorbed per level",
        value: 7
      }
    ]
};

export default CycloneArmor;
