const ThrowMastery = {
  id: "t2r2c2",
  name: "Throwing Mastery",
  description: "Increased damage and Attack Rating when throwing a weapon",
  data: {
    "Attack Rating": slvl => `+${20 + (8*slvl)}%`,
    "Damage": slvl => `+${23 + (5*slvl)}%`,
    "Critical Strike": slvl => Math.min(Math.floor(35 * Math.floor((110*slvl) / (slvl+6)) / 100), 35)
  },
  dependencies: []
};

export default ThrowMastery;
