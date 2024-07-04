const FindItem = {
  id: "t3r3c3",
  name: "Find Item",
  description: "Attempts to find a random item in a monster's corpse",
  data: {
    "Chance": slvl => `${Math.min(5 + Math.floor((55 * ((110*slvl) / (slvl+6)) / 100)), 60)}%`,
    "Mana Cost": () => 7
  },
  dependencies: []
};

export default FindItem;
