const Concentration = {
  id: "t2r4c1",
  name: "Concentration",
  description: "Increases damage dealt and reduces the chance of being interrupted during an attack",
  data: {
    "Damage": slvl => `+${45 + (15*slvl)}%`,
    "Attack Uninterrupted": () => '20%',
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Concentration;
