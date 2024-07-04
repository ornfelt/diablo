const Concentrate = {
  id: "t1r4c2",
  name: "Concentrate",
  description: "Attacks an enemy and raises concentration, temporarily increasing Defense",
  data: {
    "Defense": slvl => `+${90 + (10*slvl)}%`,
    "Attack Rating": slvl => `+${50 + (10*slvl)}%`,
    "Damage": (slvl, dlvl=[0, 0, 0]) => `+${65 + (5*slvl) +
        dlvl[0] * Concentrate.dependencies[0].value +
        dlvl[1] * Concentrate.dependencies[1].value}%`,
    "Magic Damage": (slvl, dlvl=[0, 0, 0]) => `${dlvl[2] * Concentrate.dependencies[2].value}%`,
    "Mana Cost": () => 2
  },
  dependencies: [
    {
      id: "t1r1c2",
      name: "Bash",
      description: "+{V}% Damage per level",
      value: 5
    },
    {
      id: "t3r5c2",
      name: "Battle Orders",
      description: "+{V}% Damage per level",
      value: 10
    },
    {
      id: "t1r6c2",
      name: "Berserk",
      description: "{V}% Magic Damage per level",
      value: 1
    }
  ]
};

export default Concentrate;
