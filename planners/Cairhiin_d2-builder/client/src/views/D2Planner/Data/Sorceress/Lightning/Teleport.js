const Teleport = {
  id: "t2r4c3",
  name: "Teleport",
  description: "Instantly transports you between two points",
  data: {
    "Mana Cost": slvl => Math.max(25-slvl, 1)
  },
  dependencies: []
};

export default Teleport;
