const DimVision = {
  id: "t1r2c1",
  name: "Dim Vision",
  description: "Decreases radius of vision",
  data: {
    "Radius": slvl => `${Math.floor((((6 + (2*slvl)) / 3))*10)/10} yards`,
    "Duration": slvl => `${5 + (2*slvl)} seconds`,
    "Mana Cost": slvl => 9
  },
  dependencies: []
};

export default DimVision;
