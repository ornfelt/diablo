const BattleOrders = {
  id: "t3r5c2",
  name: "Battle Orders",
  description: "Increases the nearby allies' Life, Stamina and Mana",
  data: {
    "Max Life": slvl => `+${32 + (3*slvl)}%`,
    "Max Mana": slvl => `+${32 + (3*slvl)}%`,
    "Max Stamina": slvl => `+${32 + (3*slvl)}%`,
    "Duration": (slvl, dlvl=[0, 0]) =>
      `${20 + (10*slvl) +
        dlvl[0] * BattleOrders.dependencies[0].value +
        dlvl[1] * BattleOrders.dependencies[1].value} seconds`,
    "Mana Cost": () => 7
  },
  dependencies: [
    {
      id: "t3r2c2",
      name: "Shout",
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

export default BattleOrders;
