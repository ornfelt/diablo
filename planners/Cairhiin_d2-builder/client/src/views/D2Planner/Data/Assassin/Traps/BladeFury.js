const BladeFury = {
  id: "t1r4c3",
  name: "Blade Fury",
  description: "Fires a blade swiftly at an enemy",
  data: {
    "Damage": function(slvl) {
      let min = (3*slvl) + 5;
      let max = (3*slvl) + 7;
      if (slvl > 16)  { min = (8*slvl) - 59; max = (8*slvl) - 57; }
      if (slvl > 8) { min = (5*slvl) - 11; max = (5*slvl) - 9; }
      return { min: min, max: max };
    },
    "Special": () => "+3/4 Weapon Damage",
    "Mana Cost": slvl => 0.875 + (0.125*slvl),
  },
  dependencies: []
};

export default BladeFury;
