const Shout = {
  id: "t3r2c2",
  name: "Shout",
  description: "Increases the defense of allies",
  data: {
    "Defense": slvl => `+${90 + (10*slvl)}%`,
    "Duration": (slvl, dlvl=[0, 0]) =>
      `${10 + (10*slvl) +
        dlvl[0] * Shout.dependencies[0].value +
        dlvl[1] * Shout.dependencies[1].value} seconds`,
    "Mana Cost": () => 6
  },
  dependencies: [
    {
      id: "t3r5c2",
      name: "Battle Orders",
      description: "+{V} seconds per level",
      value: 5
    },
    {
      id: "t3r6c2",
      name: "Battle Command",
      description: "+{V} seconds per level",
      value: 5
    },
  ]
};

export default Shout;
