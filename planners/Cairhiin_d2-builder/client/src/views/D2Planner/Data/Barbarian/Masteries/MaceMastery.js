const MaceMastery = {
  id: "t2r1c3",
  name: "Mace Mastery",
  description: "Increased damage and Attack Rating when using maces",
  data: {
    "Attack Rating": slvl => `+${20 + (8*slvl)}%`,
    "Damage": slvl => `+${23 + (5*slvl)}%`,
    "Critical Strike": slvl => Math.min(Math.floor(35 * Math.floor((110*slvl) / (slvl+6)) / 100), 35)
  },
  dependencies: []
};

export default MaceMastery;
