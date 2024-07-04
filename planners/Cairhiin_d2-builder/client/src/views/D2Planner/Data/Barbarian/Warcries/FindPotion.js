const FindPotion = {
  id: "t3r1c3",
  name: "Find Potion",
  description: "The Barbarian has a chance to procure a potion from a monster corpse",
  data: {
    "Chance": slvl => `${Math.min((100 * (Math.floor((110*slvl) / (slvl+6))) / 100), 100)}%`,
    "Mana Cost": () => 2
  },
  dependencies: []
};

export default FindPotion;
