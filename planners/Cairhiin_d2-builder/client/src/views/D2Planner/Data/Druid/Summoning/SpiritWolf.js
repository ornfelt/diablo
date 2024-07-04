const SpiritWolf = {
  id: "t1r2c2",
  name: "Summon Spirit Wolf",
  description: "Summons a spirit wolf to attack your enemies",
  data: {
    "Wolves": slvl => Math.min(slvl, 5),
    "Life": (slvl, dlvl=[0, 0]) => {
      let life = 71;
      if (dlvl[0] > 0) {
        life *= (Math.round(1+(25+(25*slvl) / 100)*100)/100);
      }
      return life;
    },
    "Defense": slvl => `${40+(17*slvl)}%`,
    "Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[1] * 10 + 15;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = slvl+1;
      let max = slvl+5;
      if (slvl > 28)  { min = (8*slvl)-145; max = (8*slvl)-141; }
      if (slvl > 22)  { min = (5*slvl)-61; max = (5*slvl)-57; }
      if (slvl > 16)  { min = (4*slvl)-39; max = (4*slvl)-35; }
      if (slvl > 8) { min = (2*slvl)-7; max = (2*slvl)-3; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana": () => 15
  },
  dependencies: [
    {
      id: "t1r4c2",
      name: "Summon Dire Wolf",
    },
    {
      id: "t1r6c2",
      name: "Summon Grizzly",
    }
  ]
};

export default SpiritWolf;
