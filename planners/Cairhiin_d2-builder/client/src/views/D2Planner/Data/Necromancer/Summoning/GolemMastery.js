const GolemMastery = {
  id: "t3r3c1",
  name: "Golem Mastery",
  description: "Enhances speed and life of Golems",
  data: {
    "Life": slvl => `+${20*slvl}%`,
    "Movement Speed": slvl => `+${Math.min((40 * Math.round((110*slvl) / (slvl+6)) / 100), 40)}%`,
    "Attack Rating": slvl => `+${25*slvl}`,
  },
  dependencies: []
};

export default GolemMastery;
