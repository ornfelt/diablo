const Taunt = {
  id: "t3r2c1",
  name: "Taunt",
  description: "Taunts a monster, compelling it to engage in melee combat with reduced damage",
  data: {
    "Damage": slvl => `-${3 + (2*slvl)}%`,
    "Attack Rating": slvl => `-${3 + (2*slvl)}%`,
    "Mana Cost": () => 3
  },
  dependencies: []
};

export default Taunt;
