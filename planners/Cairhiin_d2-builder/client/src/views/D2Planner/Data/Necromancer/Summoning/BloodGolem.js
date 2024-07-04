const BloodGolem = {
  id: "t3r4c2",
  name: "Blood Golem",
  description: "Summons a golem made of your blood",
  data: {
    "Life": (slvl, dlvl=[0, 0, 0, 0, 0]) => {
      let masteryMulti = dlvl[0] * 20;
      masteryMulti = Math.round(((masteryMulti) / 100 + 1)*100) / 100;
      return 201*masteryMulti;
    },
    "Damage": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      let dmgMultiplier =  (35*slvl)-35+(dlvl[4] * BloodGolem.dependencies[4].value);
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      return { min: 6*dmgMultiplier, max: 16*dmgMultiplier };
    },
    "Attack Rating": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return `+${60 + dlvl[2] * BloodGolem.dependencies[2].value}`;
    },
    "Defense": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return `+${120 + dlvl[3] * BloodGolem.dependencies[3].value}`;
    },
    "Life Steal": slvl => `${Math.min(75+Math.floor((75*(110*slvl)/(slvl+6))/100), 150)}%`,
    "Mana": slvl => 21 + (4*slvl)
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
      name: "Iron Golem",
      description: "+{V} Defense per level",
      value: 35
    },
    {
      id: "t3r6c2",
      name: "Fire Golem",
      description: "+{V}% Damage per level",
      value: 6
    }
  ]
};

export default BloodGolem;
