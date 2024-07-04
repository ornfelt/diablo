const Dodge = {
  id: "t2r2c2",
  name: "Dodge",
  description: "Grants a chance to dodge melee attacks",
  data: {
    "Chance to Dodge melee attack": slvl => `${Math.floor(Math.min(10 + (55 *((110*slvl)/(slvl+6))/100), 65))}%`
  },
  dependencies: []
};

export default Dodge;
