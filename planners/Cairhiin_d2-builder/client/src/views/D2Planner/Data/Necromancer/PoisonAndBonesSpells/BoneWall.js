const BoneWall = {
  id: "t2r3c3",
  name: "Bone Wall",
  description: "Creates a barrier of bone",
  data: {
    "Life": function(slvl, dlvl=[0, 0]) {
      let multiplier = dlvl[0] * BoneWall.dependencies[0].value +
        dlvl[1] * BoneWall.dependencies[1].value;
      let baseHPMulti = -25+(25*slvl);
      multiplier = Math.round(((multiplier+baseHPMulti) / 100 + 1)*100) / 100;
      return 19*multiplier;
    },
    "Duration": () => '24 seconds',
    "Mana Cost": () => 17
  },
  dependencies: [
    {
      id: "t2r1c3",
      name: "Bone Armor",
      description: "+{V}% Life per level",
      value: 10
    },
    {
      id: "t2r5c3",
      name: "Bone Prison",
      description: "+{V} Life per level",
      value: 10
    }
  ]
};

export default BoneWall;
