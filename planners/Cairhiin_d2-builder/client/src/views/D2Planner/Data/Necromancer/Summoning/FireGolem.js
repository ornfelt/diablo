const FireGolem = {
  id: "t3r6c2",
  name: "Fire Golem",
  description: "Summon a Golem of fire",
  data: {
    "Life": (slvl, dlvl=[0, 0, 0, 0, 0]) => {
      let masteryMulti = dlvl[0] * 20 + dlvl[3] * FireGolem.dependencies[3].value;
      masteryMulti = Math.round(((masteryMulti) / 100 + 1)*100) / 100;
      return 313*masteryMulti;
    },
    "Damage": () => ({ min: 10, max: 27 }),
    "Attack Rating": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return `+${120 + dlvl[2] * FireGolem.dependencies[2].value}`;
    },
    "Defense": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return `+${200 + dlvl[4] * FireGolem.dependencies[4].value}`;
    },
    "Mana": slvl => 40 + (10*slvl)
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
      name: "Iron Golem",
      description: "+{V} Defense per level",
      value: 35
    }
  ]
};

export default FireGolem;
