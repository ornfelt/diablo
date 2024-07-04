const PoisonCreeper = {
  id: "t1r1c3",
  name: "Poison Creeper",
  description: "Summons a poisonous vine that attacks enemies from underground",
  data: {
    "Life": slvl => Math.floor(58*(75+(25*slvl))/100),
    "Poison Damage": function(slvl) {
      let min = (7*slvl)+5;
      let max = (7*slvl)+9;
      if (slvl > 28)  { min = (19*slvl)-183; max = (19*slvl)-179; }
      if (slvl > 22)  { min = (17*slvl)-127; max = (17*slvl)-123; }
      if (slvl > 16)  { min = (15*slvl)-83; max = (15*slvl)-79; }
      if (slvl > 8) { min = (12*slvl)-35; max = (12*slvl)-31; }
      return { min: Math.floor(min * (25/256) * 4), max: Math.floor(max * (25/256) * 4) };
    },
    "Poison Duration": () => '4 seconds',
    "Mana": () => 8
  },
  dependencies: []
};

export default PoisonCreeper;
