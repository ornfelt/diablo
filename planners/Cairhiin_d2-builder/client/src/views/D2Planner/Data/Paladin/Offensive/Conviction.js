const Conviction = {
  id: "t2r6c3",
  name: "Conviction",
  description: "Reduces enemy Defense and Resistances",
  data: {
    "Reduced Enemy Defense": slvl => `+${Math.min(40 + (60 * Math.round((110*slvl)/(slvl+6))/100), 100)}%`,
    "Resist All": slvl => `+${Math.min(25 + 5*slvl , 150)}%`,
    "Radius": slvl => '13.3 yards'
  },
  dependencies: []
};

export default Conviction;
