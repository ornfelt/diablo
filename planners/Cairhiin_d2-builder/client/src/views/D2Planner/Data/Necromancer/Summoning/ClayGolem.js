const ClayGolem = {
  id: "t3r2c2",
  name: "Clay Golem",
  description: "Raises a Golem from the earth to fight for you",
  data: {
    "Life": (slvl, dlvl=[0, 0, 0, 0, 0]) => {
      let multiplier = dlvl[2] * ClayGolem.dependencies[2].value;
      let baseHPMulti = Math.floor(65+(35*slvl))/100;
      let masteryMulti = dlvl[0] * 20;
      multiplier = Math.round(((multiplier+masteryMulti) / 100 + 1)*100) / 100;
      return 100*baseHPMulti*multiplier;
    },
    "Damage": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      let dmgMultiplier =  (35*slvl)-35+(dlvl[4] * ClayGolem.dependencies[4].value);
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      return { min: 2*dmgMultiplier, max: 5*dmgMultiplier };
    },
    "Attack Rating": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return `+${40+(20*slvl) + dlvl[0] * 25}`;
    },
    "Defense": function(slvl, dlvl=[0, 0, 0, 0, 0]) {
      return `+${40+(20*slvl) + dlvl[3] * ClayGolem.dependencies[3].value}`;
    },
    "Slows Target": slvl => `${Math.min(Math.floor((75*(110*slvl)/(slvl+6))/100), 75)}%`,
    "Mana": slvl => 12 + (3*slvl)
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
      name: "Blood Golem",
      description: "+{V}% Life per level",
      value: 5
    },
    {
      id: "t3r5c2",
      name: "Iron Golem",
      description: "+{V} Defense per level",
      value: 6
    },
    {
      id: "t3r6c2",
      name: "Fire Golem",
      description: "+{V}% Damage per level",
      value: 35
    }
  ]
};

export default ClayGolem;
