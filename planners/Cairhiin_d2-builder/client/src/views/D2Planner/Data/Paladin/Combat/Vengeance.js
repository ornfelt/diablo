const Vengeance = {
  id: "t1r4c1",
  name: "Vengeance",
  description: "Adds Elemental (Fire, Lightning and Cold) damage to all melee attacks",
  data: {
    "Weapon Damage": () => '100%',
    "Attack Rating": slvl => `+${10 + (10*slvl)}%`,
    "Fire Damage": (slvl, dlvl=[0, 0, 0, 0]) => `+${64 + (6*slvl) +
      dlvl[0] * Vengeance.dependencies[0].value +
      dlvl[3] * Vengeance.dependencies[3].value}%`,
    "Cold Damage": (slvl, dlvl=[0, 0, 0, 0]) => `+${64 + (6*slvl) +
      dlvl[1] * Vengeance.dependencies[1].value +
      dlvl[3] * Vengeance.dependencies[3].value}%`,
    "Lightning Damage": (slvl, dlvl=[0, 0, 0, 0]) => `+${64 + (6*slvl) +
      dlvl[2] * Vengeance.dependencies[2].value +
      dlvl[3] * Vengeance.dependencies[3].value}%`,
    "Cold Duration": slvl => `${0.6 + (0.6*slvl)} seconds`,
    "Mana Cost": slvl => 3.75 + (0.25*slvl)
  },
  dependencies: [
    {
      id: "t3r1c3",
      name: "Resist Fire",
      description: "+{V}% Fire Damage per level",
      value: 10
    },
    {
      id: "t3r2c3",
      name: "Resist Cold",
      description: "+{V}% Cold Damage per level",
      value: 10
    },
    {
      id: "t3r3c3",
      name: "Resist Lightning",
      description: "+{V}% Lightning Damage per level",
      value: 10
    },
    {
      id: "t3r6c3",
      name: "Salvation",
      description: "+{V}% Elemental Damage per level",
      value: 2
    }
  ]
};

export default Vengeance;
