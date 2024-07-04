const IronGolem = {
  id: "t3r5c2",
  name: "Iron Golem",
  description: "Summon a powerful Golem at the cost of a metal item. The Golem takes the properties of the sacrificed item",
  data: {
    "Life": (slvl, dlvl=[0, 0, 0, 0, 0]) => {
      let masteryMulti = dlvl[0] * 20 + dlvl[3] * IronGolem.dependencies[3].value;
      masteryMulti = Math.round(((masteryMulti) / 100 + 1)*100) / 100;
      return 306*masteryMulti;
    },
    "Damage": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      let dmgMultiplier =  dlvl[4] * IronGolem.dependencies[4].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      return { min: 7*dmgMultiplier, max: 19*dmgMultiplier };
    },
    "Attack Rating": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return `+${80 + dlvl[2] * IronGolem.dependencies[2].value}`;
    },
    "Defense": slvl => `+${140+(35*slvl)}`,
    "Mana": slvl => 35
  },
  dependencies: [
    {
      id: "t3r3c1",
      name: "Golem Mastery",
    },
    {
      id: "t3r5c1",
      name: "Summon Resist",
    },
    {
      id: "t3r4c2",
      name: "Clay Golem",
      description: "+{V} Attack Rating per level",
      value: 20
    },
    {
      id: "t3r5c2",
      name: "Blood Golem",
      description: "+{V}% Life per level",
      value: 5
    },
    {
      id: "t3r6c2",
      name: "Fire Golem",
      description: "+{V}% Damage per level",
      value: 6
    }
  ]
};

export default IronGolem;
