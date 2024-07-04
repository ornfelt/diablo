const Sacrifice = {
  id: "t1r1c1",
  name: "Sacrifice",
  description: "Increased damage at the cost of health",
  data: {
    "Weapon Damage": () => '100%',
    "Attack Rating": slvl => `+${13 + (7*slvl)}%`,
    "Damage": (slvl, dlvl=[0, 0]) => `+${165 + (15*slvl) +
      dlvl[0] * Sacrifice.dependencies[0].value +
      dlvl[1] * Sacrifice.dependencies[1].value}%`,
    "Damage to Self": () => '8%'
  },
  dependencies: [
    {
      id: "t2r6c1",
      name: "Fanaticism",
      description: "+{V}% Damage per level",
      value: 5
    },
    {
      id: "t3r6c2",
      name: "Redemption",
      description: "+{V}% Damage per level",
      value: 5
    },
  ]
};

export default Sacrifice;
