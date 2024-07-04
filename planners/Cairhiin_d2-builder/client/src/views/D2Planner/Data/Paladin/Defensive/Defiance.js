const Defiance = {
  id: "t3r2c2",
  name: "Defiance",
  description: "Boosts the Defense of all party members",
  data: {
    "Defense": slvl => `+${60 + (10*slvl)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Defiance;
