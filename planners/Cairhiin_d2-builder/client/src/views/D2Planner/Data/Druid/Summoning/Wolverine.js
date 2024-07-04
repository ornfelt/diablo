const Wolverine = {
  id: "t1r4c1",
  name: "Heart of Wolverine",
  description: "Summons a spirit to increase the party's Damage and Attack Rating",
  data: {
    "Life": slvl =>	Math.floor(((128*(75+(25*slvl))/100)+(144*(75+(25*slvl))/100))/2),
    "Attack Rating": slvl => `+${7*slvl + 18}%`,
    "Damage": slvl => `+${7*slvl + 13}%`,
    "Radius": slvl => `+${Math.floor((2*slvl + 28) * 2/3)} yards`,
    "Mana": slvl => 19+slvl
  },
  dependencies: []
};

export default Wolverine;
