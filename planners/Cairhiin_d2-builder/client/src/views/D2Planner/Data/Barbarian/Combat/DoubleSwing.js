const DoubleSwing = {
  id: "t1r2c3",
  name: "Double Swing",
  description: "Attack with both weapons, striking two enemies at once",
  data: {
    "Attack Rating": slvl => `${10 + (5*slvl)}%`,
    "Damage": (slvl, dlvl=[0]) => `+${dlvl[0] * DoubleSwing.dependencies[0].value}%`,
    "Mana Cost": slvl => Math.max(1.125 - (0.125*slvl), 0)
  },
  dependencies: [
    {
      id: "t1r1c2",
      name: "Bash",
      description: "+{V}% Damage per level",
      value: 10
    }
  ]
};

export default DoubleSwing;
