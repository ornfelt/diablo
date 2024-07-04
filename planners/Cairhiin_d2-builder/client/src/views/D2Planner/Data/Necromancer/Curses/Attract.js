const Attract = {
  id: "t1r5c1",
  name: "Attract",
  description: "Causes other monsters to target your enemy",
  data: {
    "Radius": slvl => '6 yards',
    "Duration": slvl => `${8.4 + (3.6*slvl)} seconds`,
    "Mana Cost": slvl => 17
  },
  dependencies: []
};

export default Attract;
