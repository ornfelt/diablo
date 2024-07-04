const Confuse = {
  id: "t1r4c1",
  name: "Confuse",
  description: "Confuses monsters, causing them to attack randomly",
  data: {
    "Radius": slvl => `${(10 + (2*slvl) ) / 3} yards`,
    "Duration": slvl => `${8 + (2*slvl)} seconds`,
    "Mana Cost": slvl => 13
  },
  dependencies: []
};

export default Confuse;
