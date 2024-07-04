const Bash = {
  id: "t1r1c2",
  name: "Bash",
  description: "Attacks an enemy and knocks them back",
  data: {
    "Attack Rating": (slvl, dlvl=[0, 0]) => `+${15 + (5*slvl) + dlvl[1] * Bash.dependencies[1].value}%`,
    "Damage": (slvl, dlvl=[0, 0]) => `+${45 + (5*slvl) + dlvl[0] * Bash.dependencies[0].value}%`,
    "Mana Cost": () => 2
  },
  dependencies: [
    {
      id: "t1r3c2",
      name: "Stun",
      description: "+{V}% Damage per level",
      value: 5
    },
    {
      id: "t1r4c2",
      name: "Concentrate",
      description: "+{V}% Attack Rating per level",
      value: 5
    },
  ]
};

export default Bash;
