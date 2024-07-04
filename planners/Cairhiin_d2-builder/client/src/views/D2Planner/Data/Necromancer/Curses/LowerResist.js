const LowerResist = {
  id: "t1r6c2",
  name: "Lower Resist",
  description: "Elemental attacks do more damage to the cursed monster",
  data: {
    "Resistances": slvl => `-${Math.min(25 + Math.floor((45 * (110*slvl) / (slvl+6) / 100)), 70)}%`,
    "Radius": slvl => `${Math.floor((((12 + (2*slvl) ) / 3))*10)/10} yards`,
    "Duration": slvl => `${18 + (2*slvl)} seconds`,
    "Mana Cost": slvl => 22
  },
  dependencies: []
};

export default LowerResist;
