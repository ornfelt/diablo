const Evade = {
  id: "t2r5c2",
  name: "Evade",
  description: "Grants a chance to evade any attack while moving",
  data: {
    "Chance to Evade while moving": slvl => `${Math.floor(Math.min(10 + (55 *((110*slvl)/(slvl+6))/100), 65))}%`
  },
  dependencies: []
};

export default Evade;
