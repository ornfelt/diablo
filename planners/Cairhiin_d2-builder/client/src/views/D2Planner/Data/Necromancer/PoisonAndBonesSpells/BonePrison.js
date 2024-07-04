const BonePrison = {
  id: "t2r5c3",
  name: "Bone Prison",
  description: "Summons a ring of bone to surround a target",
  data: {
    "Life": function(slvl, dlvl=[0, 0]) {
      let multiplier = dlvl[0] * BonePrison.dependencies[0].value +
        dlvl[1] * BonePrison.dependencies[1].value;
      let baseHPMulti = -25+(25*slvl);
      multiplier = Math.round(((multiplier+baseHPMulti) / 100 + 1)*100) / 100;
      return 19*multiplier;
    },
    "Duration": () => '24 seconds',
    "Mana Cost": slvl => Math.max(28-slvl, 1)
  },
  dependencies: [
    {
      id: "t2r1c3",
      name: "Bone Armor",
      description: "+{V}% Life per level",
      value: 8
    },
    {
      id: "t2r3c3",
      name: "Bone Wall",
      description: "+{V} Life per level",
      value: 8
    }
  ]
};

export default BonePrison;
