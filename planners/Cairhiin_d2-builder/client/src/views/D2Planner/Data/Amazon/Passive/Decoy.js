const Decoy = {
  id: "t2r5c1",
  name: "Decoy",
  description: "Creates a double, confusing foes",
  data: {
    "Life": slvl => `+${(10*slvl)}%`,
    "Duration": slvl => `${5 + (5*slvl)} seconds`,
    "Mana Cost": slvl => Math.max(19.75 - (0.75*slvl), 1)
  },
  dependencies: []
};

export default Decoy;
