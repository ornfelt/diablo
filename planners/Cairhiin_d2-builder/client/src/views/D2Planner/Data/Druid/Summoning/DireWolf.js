const DireWolf = {
  id: "t1r4c2",
  name: "Summon Dire Wolf",
  description: "Summons a Dire Wolf to attack your enemies",
  data: {
    "Wolves": slvl => Math.min(slvl, 3),
    "Defense": (slvl, dlvl=[0, 0]) => {
      let defense = (4*slvl);
      if (dlvl[0] > 0) {
        defense += 40+(10*dlvl[0]);
      }
      return `+${defense}%`;
    },
    "Life": (slvl, dlvl=[0, 0]) => {
      let life = 114;
      if (dlvl[0] > 0) {
        life *= 1+((25+25*dlvl[0]) / 100);
      }
      return Math.floor(life);
    },
    "Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[1] * 10 + 15;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (2*slvl)+5;
      let max = (2*slvl)+10;
      if (slvl > 28)  { min = (11*slvl)-179; max = (13*slvl)-224; }
      if (slvl > 22)  { min = (8*slvl)-95; max = (9*slvl)-11; }
      if (slvl > 16)  { min = (6*slvl)-51; max = (6*slvl)-46; }
      if (slvl > 8) { min = (3*slvl)-3; max = (3*slvl)+2; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana": () => 20
  },
  dependencies: [
    {
      id: "t1r2c2",
      name: "Summon Spirit Wolf",
    },
    {
      id: "t1r6c2",
      name: "Summon Grizzly",
    }
  ]
};

export default DireWolf;
