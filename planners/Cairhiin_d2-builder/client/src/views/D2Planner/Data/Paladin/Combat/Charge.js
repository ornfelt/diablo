const Charge = {
  id: "t1r3c3",
  name: "Charge",
  description: "Closes the distance with an enemy, delivering a bash on contact",
  data: {
    "Weapon Damage": () => '100%',
    "Attack Rating": slvl => `+${15*slvl+35}%`,
    "Damage": (slvl, dlvl=[0, 0]) => `+${25*slvl + 75 +
      dlvl[0] * Charge.dependencies[0].value +
      dlvl[1] * Charge.dependencies[1].value}%`,
    "Mana Cost": 9
  },
  dependencies: [
    {
      id: "t2r1c1",
      name: "Might",
      description: "+{V}% Damage per level",
      value: 20
    },
    {
      id: "t3r4c2",
      name: "Vigor",
      description: "+{V}% Damage per level",
      value: 20
    }
  ]
};

export default Charge;
