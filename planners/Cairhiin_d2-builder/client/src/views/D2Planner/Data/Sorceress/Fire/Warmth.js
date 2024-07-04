const Warmth = {
  id: "t1r1c3",
  name: "Warmth",
  description: "Increases Mana recovery rate",
  data: {
    "Regenerate Mana": slvl => 18 + (12*slvl)
  },
  dependencies: []
};

export default Warmth;
