const Pierce = {
  id: "t2r6c3",
  name: "Pierce",
  description: "Grants a chance for your missile attacks to continue through its victim",
  data: {
    "Chance of Missile piercing": slvl => `${Math.floor(Math.min(10 + (90 *((110*slvl)/(slvl+6))/100), 100))}%`
  },
  dependencies: []
};

export default Pierce;
