const Salvation = {
  id: "t3r6c3",
  name: "Salvation",
  description: "Increases all Elemental resistances for all party members",
  data: {
    "Resistances": slvl => `${Math.min(50 + (70 * Math.round((110*slvl)/(slvl+6))/100), 120)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Salvation;
