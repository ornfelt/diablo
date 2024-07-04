const Avoid = {
  id: "t2r3c2",
  name: "Avoid",
  description: "Grants a chance to move out of the way of a missile attack while standing still",
  data: {
    "Chance to Dodge missile attack": slvl => `${Math.floor(Math.min(15 + (60 *((110*slvl)/(slvl+6))/100), 75))}%`
  },
  dependencies: []
};

export default Avoid;
