const Penetrate = {
  id: "t2r4c3",
  name: "Penetrate",
  description: "Improves attack, increasing your chance to hit",
  data: {
    "Attack Rating": slvl => `+${25 + (10*slvl)}%`
  },
  dependencies: []
};

export default Penetrate;
