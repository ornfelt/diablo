const BlessedAim = {
  id: "t2r3c1",
  name: "Blessed Aim",
  description: "Increases Attack Rating",
  data: {
    "Attack Rating": slvl => `+${60 + (15*slvl)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default BlessedAim;
