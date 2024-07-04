const Stamina = {
  id: "t2r3c1",
  name: "Increased Stamina",
  description: "Increases stamina, and stamina recovery rate",
  data: {
    "Stamina": slvl => `+${15 + (15*slvl)}%`
  },
  dependencies: []
};

export default Stamina;
