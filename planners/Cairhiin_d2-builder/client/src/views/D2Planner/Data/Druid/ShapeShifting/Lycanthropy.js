const Lycanthropy = {
  id: "t2r1c2",
  name: "Lycanthropy",
  description: "Increases the Life of the Druid while Shapeshifted, as well as the duration of the transformation",
  data: {
    "Life": slvl => `+${15 + (5*slvl)}%`,
    "Duration": slvl => `${20 + (20*slvl)} seconds`
  },
  dependencies: []
};

export default Lycanthropy;
