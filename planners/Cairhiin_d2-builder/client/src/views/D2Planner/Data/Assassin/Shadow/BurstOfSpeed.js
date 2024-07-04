const BurstOfSpeed = {
  id: "t2r2c1",
  name: "Burst of Speed",
  description: "Increases Attack and Movement Speed for a period of time",
  data: {
    "Attack Speed": slvl => `+${Math.min(15 + Math.floor((45*(Math.floor((110*slvl)/(slvl+6)))/100)), 60)}%`,
    "Movement Speed": slvl => `+${Math.min(15 + Math.floor((55*(Math.floor((110*slvl)/(slvl+6)))/100)), 70)}%`,
    "Duration": slvl => `${(12*slvl) + 108} seconds`,
    "Mana Cost": () => 10
  },
  dependencies: []
};

export default BurstOfSpeed;
