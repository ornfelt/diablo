const FireResist = {
  id: "t3r1c3",
  name: "Resist Fire",
  description: "Increases the Fire resistance of all party members",
  data: {
    "Fire Resist": slvl => `${Math.min(35 + (115 * Math.round((110*slvl)/(slvl+6))/100), 150)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default FireResist;
