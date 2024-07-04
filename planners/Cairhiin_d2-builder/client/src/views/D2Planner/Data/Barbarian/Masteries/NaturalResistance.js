const NaturalResistance = {
  id: "t2r6c1",
  name: "Increased Speed",
  description: "Increases walk and run speeds",
  data: {
    "Resistances": slvl => `+${Math.min(Math.floor(80 * Math.floor((110*slvl) / (slvl+6)) / 100), 80)}%`
  },
  dependencies: []
};

export default NaturalResistance;
