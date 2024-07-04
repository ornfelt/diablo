const Jab = {
  id: "t3r1c1",
  name: "Jab",
  description: "Attack with a series of rapid thrusts using a javelin or spear class weapon",
  data: {
    "Attack Rating": slvl => `${(9*slvl) + 1}%`,
    "Damage": slvl => `${(3*slvl) - 18}%`,
    "Mana Cost": slvl => 1.75 + (0.25*slvl)
  },
  dependencies: []
};

export default Jab;
