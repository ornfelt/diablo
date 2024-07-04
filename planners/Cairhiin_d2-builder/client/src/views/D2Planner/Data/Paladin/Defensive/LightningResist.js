const LightningResist = {
  id: "t3r3c3",
  name: "Resist Lightning",
  description: "Increases the Lightning resistance of all party members",
  data: {
    "Lightning Resist": slvl => `${Math.min(35 + (115 * Math.round((110*slvl)/(slvl+6))/100), 150)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default LightningResist;
