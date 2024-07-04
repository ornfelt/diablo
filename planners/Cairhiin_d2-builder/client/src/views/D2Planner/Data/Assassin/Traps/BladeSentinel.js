const BladeSentinel = {
  id: "t1r2c3",
  name: "Blade Sentinel",
  description: "Throws a razor sharp blade that flies back and forth between the Assassin and her target",
  data: {
    "Damage": function(slvl) {
      let min = (3*slvl) + 3;
      let max = (3*slvl) + 7;
      if (slvl > 16)  { min = (5*slvl) - 21; max = (5*slvl) - 17; }
      if (slvl > 8) { min = (4*slvl) - 5; max = (4*slvl) - 1; }
      return { min: min, max: max };
    },
    "Duration": slvl => `${Math.floor(3.52 + (0.48*slvl))} seconds`,
    "Special": () => "+3/8 Weapon Damage",
    "Mana Cost": () => 7,
  },
  dependencies: []
};

export default BladeSentinel;
