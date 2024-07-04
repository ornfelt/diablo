const OakSage = {
  id: "t1r2c1",
  name: "Oak Sage",
  description: "Summons a spirit that increases your party's health",
  data: {
    "Life": slvl =>	Math.floor(((64*(70+(30*slvl))/100)+(56*(70+(30*slvl))/100))/2),
    "Max Life": slvl => `+${5*slvl + 25}%`,
    "Radius": slvl => `+${Math.floor((2*slvl + 28) * 2/3)} yards`,
    "Mana": slvl => 14+slvl
  },
  dependencies: []
};

export default OakSage;
