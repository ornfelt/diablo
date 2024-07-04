const Might = {
  id: "t2r1c1",
  name: "Might",
  description: "Increase damage dealt by the Paladin and his allies",
  data: {
    "Damage": slvl => `+${30 + (10*slvl)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Might;
