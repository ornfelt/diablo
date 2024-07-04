const Werebear = {
  id: "t2r2c3",
  name: "Werebear",
  description: "Transforms the Druid into a Werebear",
  data: {
    "Life": (slvl, dlvl=[0, 0]) => {
      if (dlvl[0] > 0) {
        return `+${75 + 15 + dlvl[0] * Werebear.dependencies[0].value}%`;
      }
      return '+75%';
    },
    "Defense": slvl => `+${19 + (6*slvl)}%`,
    "Damage": slvl => `+${47 + (8*slvl)}%`,
    "Duration": (slvl, dlvl=[0, 0]) => {
      if (dlvl[1] > 0) {
        return `+${40 + 20 + dlvl[1] * Werebear.dependencies[1].value} seconds`;
      }
      return '40 seconds';
    },
    "Mana Cost": () => 15
  },
  dependencies: [
    {
      id: "t2r1c2",
      name: "Lycanthropy",
      description: "+{V}% Life per level",
      value: 5
    },
    {
      id: "t2r1c2",
      name: "Lycanthropy",
      description: "+{V} seconds per level",
      value: 20
    }
  ]
};

export default Werebear;
