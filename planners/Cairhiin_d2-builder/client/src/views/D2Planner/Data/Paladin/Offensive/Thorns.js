const Thorns = {
  id: "t2r2c3",
  name: "Thorns",
  description: "Enemies take damage when they cause melee damage to party members",
  data: {
    "Damage Reflected": slvl => `${210 + (40*slvl)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Thorns;
