const BattleCommand = {
  id: "t3r6c2",
  name: "Battle Command",
  description: "Increases the Barbarian's and nearby allies' skills by one",
  data: {
    "Duration": (slvl, dlvl=[0, 0]) =>
      `${(10*slvl) -5 +
        dlvl[0] * BattleCommand.dependencies[0].value +
        dlvl[1] * BattleCommand.dependencies[1].value} seconds`,
    "Mana Cost": () => 11
  },
  dependencies: [
    {
      id: "t3r2c2",
      name: "Shout",
      description: "+{V} seconds per level",
      value: 5
    },
    {
      id: "t3r5c2",
      name: "Battle Orders",
      description: "+{V} seconds per level",
      value: 5
    },
  ]
};

export default BattleCommand;
