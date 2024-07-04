const ThunderStorm = {
  id: "t2r5c1",
  name: "Thunderstorm",
  description: "Summons a thunderstorm that periodically blasts a nearby enemy with a bolt of lightning",
  data: {
    "Lightning Damage": function(slvl) {
      let min = 10*slvl - 9;
      let max = 10*slvl + 90;
      if (slvl > 16) { min = 11*slvl - 25; max = 11*slvl + 74; }
      return {min: min, max: max};
    },
    "Mana Cost": () => 19,
    "Duration": slvl => `${24 + (8*slvl)} seconds`
  },
  dependencies: []
};

export default ThunderStorm;
