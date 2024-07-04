const LeapAttack = {
  id: "t1r4c1",
  name: "Leap Attack",
  description: "Leap at an enemy, striking them as you land, and knocking back surrounding foes",
  data: {
    "Attack Rating": slvl => `+${35 + (15*slvl)}%`,
    "Damage": (slvl, dlvl=[0]) => `+${70 + (30*slvl) + dlvl[0] * LeapAttack.dependencies[0].value}%`,
    "Mana Cost": () => 9
  },
  dependencies: [
    {
      id: "t1r2c1",
      name: "Leap",
      description: "+{V}% Damage per level",
      value: 10
    }
  ]
};

export default LeapAttack;
