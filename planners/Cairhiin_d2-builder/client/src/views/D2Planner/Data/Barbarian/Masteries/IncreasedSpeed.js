const IncreasedSpeed = {
  id: "t2r5c1",
  name: "Increased Speed",
  description: "Increases walk and run speeds",
  data: {
    "Movement speed": slvl => `+${Math.min(7 + Math.floor(43 * Math.floor((110*slvl) / (slvl+6)) / 100), 50)}%`
  },
  dependencies: []
};

export default IncreasedSpeed;
