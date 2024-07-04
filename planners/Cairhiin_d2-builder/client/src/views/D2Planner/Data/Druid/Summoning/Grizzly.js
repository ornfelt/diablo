const Grizzly = {
  id: "t1r6c2",
  name: "Summon Grizzly",
  description: "Summons a Grizzly bear to attack your enemies",
  data: {
    "Life": (slvl, dlvl=[0, 0]) => {
      let life = 650;
      if (dlvl[1] > 0) {
        life *= 1+((25+25*dlvl[1]) / 100);
      }
      return Math.floor(life);
    },
    "Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[1] * 10 + 15;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (10*slvl)+20;
      let max = (10*slvl)+50;
      if (slvl > 28)  { min = (30*slvl)-344; max = (30*slvl)-314; }
      if (slvl > 22)  { min = (26*slvl)-232; max = (26*slvl)-202; }
      if (slvl > 16)  { min = (20*slvl)-100; max = (20*slvl)-70; }
      if (slvl > 8) { min = (15*slvl)-20; max = (15*slvl)+10; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Resistences": slvl => `${Math.min((5*slvl)-5, 85)}%`,
    "Mana": () => 40
  },
  dependencies: [
    {
      id: "t1r2c2",
      name: "Summon Spirit Wolf",
    },
    {
      id: "t1r6c2",
      name: "Summon Dire Wolf",
    }
  ]
};

export default Grizzly;
