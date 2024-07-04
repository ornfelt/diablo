const Frenzy = {
  id: "t1r5c3",
  name: "Frenzy",
  description: "Every successful hit increases velocity and attack speed",
  data: {
    "Attack Rating": slvl => `${93 + (7*slvl)}%`,
    "Damage": (slvl, dlvl=[0, 0, 0]) => `+${85 + (5*slvl) +
      dlvl[0] * Frenzy.dependencies[0].value +
      dlvl[1] * Frenzy.dependencies[1].value }%`,
    "Magic Damage": (slvl, dlvl=[0, 0, 0]) => `${dlvl[2] * Frenzy.dependencies[2].value}%`,
    "Attack Speed": slvl => `+7-${Math.min((50 * Math.floor((110*slvl)/(slvl+6)) / 100), 50)}%`,
    "Movement Speed": slvl => `+47-${Math.min(20 + (180 * Math.floor((110*slvl)/(slvl+6)) / 100), 200)}%`,
    "Mana Cost": slvl => 1.5
  },
  dependencies: [
    {
      id: "t1r2c3",
      name: "Double Swing",
      description: "+{V}% Damage per level",
      value: 8
    },
    {
      id: "t3r2c1",
      name: "Taunt",
      description: "+{V}% Damage per level",
      value: 8
    },
    {
      id: "t1r6c2",
      name: "Berserk",
      description: "{V}% Magic Damage per level",
      value: 1
    }
  ]
};

export default Frenzy;
