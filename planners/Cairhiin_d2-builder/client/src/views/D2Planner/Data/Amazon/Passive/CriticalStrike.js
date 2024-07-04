const CriticalStrike = {
  id: "t2r1c3",
  name: "Critical Strike",
  description: "Grants a chance to do double damage",
  data: {
    "Critical Strike chance": slvl => `${Math.floor(Math.min(5 + (75 *((110*slvl)/(slvl+6))/100), 80))}%`
  },
  dependencies: []
};

export default CriticalStrike;
