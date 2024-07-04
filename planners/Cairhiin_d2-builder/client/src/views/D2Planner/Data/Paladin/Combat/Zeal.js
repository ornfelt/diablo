const Zeal = {
  id: "t1r3c1",
  name: "Zeal",
  description: "Quickly attacks multiple adjacent enemies",
  data: {
    "Weapon Damage": () => '100%',
    "Attack Rating": slvl => `+${10*slvl}%`,
    "Damage": (slvl, dlvl=[0, 0]) => `+${Math.max((6*slvl)-24, 0) +
      dlvl[0] * Zeal.dependencies[0].value}%`,
    "Attacks": slvl => `${Math.min(slvl+1, 5)}`,
    "Mana Cost": () => 2
  },
  dependencies: [
    {
      id: "t1r1c1",
      name: "Sacrifice",
      description: "+{V}% Damage per level",
      value: 5
    }
  ]
};

export default Zeal;
