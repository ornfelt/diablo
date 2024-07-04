const Terror = {
  id: "t1r3c3",
  name: "Terror",
  description: "Causes monsters to run away in fear",
  data: {
    "Radius": slvl => '4.6 yards',
    "Duration": slvl => `${7 + (1*slvl)} seconds`,
    "Mana Cost": slvl => 7
  },
  dependencies: []
};

export default Terror;
