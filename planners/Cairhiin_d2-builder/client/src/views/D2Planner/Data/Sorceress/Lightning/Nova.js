const Nova = {
  id: "t2r3c1",
  name: "Nova",
  description: "Creates an expanding ring of electricity",
  data: {
    "Lightning Damage": function(slvl) {
      let min = 6*slvl - 5;
      let max = 8*slvl + 12
      if (slvl > 28) { min = 10*slvl - 79; max = 12*slvl - 62; }
      if (slvl > 22) { min = 9*slvl - 51; max = 11*slvl - 34; }
      if (slvl > 16) { min = 8*slvl - 29; max = 10*slvl - 12; }
      if (slvl > 8) { min = 7*slvl - 13; max = 9*slvl + 4; }
      return { min: min, max: max };
    },
    "Mana Cost": () => 15
  },
  dependencies: []
};

export default Nova;
