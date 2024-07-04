const WhirlWind = {
  id: "t1r6c1",
  name: "Whirlwind",
  description: "The Barbarian spins his weapons around him, striking everything in his path",
  data: {
    "Attack Rating": slvl => `+${(5*slvl) - 5}%`,
    "Damage": slvl => `+${(8*slvl) - 58}%`,
    "Mana Cost": slvl => 12 + (0.5*slvl)
  },
  dependencies: []
};

export default WhirlWind;
