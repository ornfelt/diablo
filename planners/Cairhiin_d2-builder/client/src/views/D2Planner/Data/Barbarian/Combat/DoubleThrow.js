const DoubleThrow = {
  id: "t1r3c3",
  name: "Double Throw",
  description: "Throws both weapons outwards",
  data: {
    "Attack Rating": slvl => `${10 + (10*slvl)}%`,
    "Damage": (slvl, dlvl=[0]) => `+${dlvl[0] * DoubleThrow.dependencies[0].value}%`,
    "Mana Cost": slvl => 1
  },
  dependencies: [
    {
      id: "t1r2c3",
      name: "DoubleSwing",
      description: "+{V}% Damage per level",
      value: 10
    }
  ]
};

export default DoubleThrow;
