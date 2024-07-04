const ColdResist = {
  id: "t3r2c3",
  name: "Resist Cold",
  description: "Increases the Cold resistance of all party members",
  data: {
    "Cold Resist": slvl => `${Math.min(35 + (115 * Math.round((110*slvl)/(slvl+6))/100), 150)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default ColdResist;
