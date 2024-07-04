const BladeShield = {
  id: "t1r6c3",
  name: "Blade Shield",
  description: "Covers the Assassin in a shield of small razors",
  data: {
    "Damage": function(slvl) {
      let min = (5*slvl) - 4;
      let max = (5*slvl) + 25;
      if (slvl > 16)  { min = (7*slvl) - 28; max = (7*slvl) + 1; }
      if (slvl > 8) { min = (6*slvl) - 12; max = (6*slvl) + 17; }
      return { min: min, max: max };
    },
    "Duration": slvl => `${15 + (5*slvl)} seconds`,
    "Special": () => "+1/4 Weapon Damage",
    "Mana Cost": slvl => (6*slvl) + 17,
  },
  dependencies: []
};

export default BladeShield;
