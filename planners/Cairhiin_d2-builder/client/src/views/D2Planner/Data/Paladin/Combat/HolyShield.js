const HolyShield = {
  id: "t1r5c3",
  name: "Holy Shield",
  description: "Magically enhances shield to give defense bonuses",
  data: {
    "Defense": (slvl, dlvl=[0]) => `+${15*slvl + 10 +
      dlvl[0] * HolyShield.dependencies[0].value}%`,
    "Duration": slvl => `${25*slvl + 5} seconds`,
    "Block Chance": slvl => `${Math.min(10 + Math.round(30*((110*slvl)/(slvl+6))/100), 40)}%`,
    "Mana Cost": 35
  },
  dependencies: [
    {
      id: "t3r2c2",
      name: "Defiance",
      description: "+{V}% Defense per level",
      value: 15
    }
  ]
};

export default HolyShield;
