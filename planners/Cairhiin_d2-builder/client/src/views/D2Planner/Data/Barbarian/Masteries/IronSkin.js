const IronSkin = {
  id: "t2r4c3",
  name: "Iron Skin",
  description: "Improves overall Defense",
  data: {
    "Defense": slvl => `+${20 + (10*slvl)}%`
  },
  dependencies: []
};

export default IronSkin;
