const BoneArmor = {
  id: "t2r1c3",
  name: "Bone Armor",
  description: "Creates a protective shield of bone that absorbs damage from physical attacks",
  data: {
    "Physical Damage Absorbed": (slvl, dlvl=[0, 0]) => (
      10 + (10*slvl) +
        dlvl[0] * BoneArmor.dependencies[0].value +
        dlvl[1] * BoneArmor.dependencies[1].value
    ),
    "Mana Cost": slvl => 10+slvl
  },
  dependencies: [
    {
      id: "t2r3c3",
      name: "Bone Wall",
      description: "+{V} Physical Damage Absorbed per level",
      value: 15
    },
    {
      id: "t2r5c3",
      name: "Bone Prison",
      description: "+{V} Physical Damage Absorbed per level",
      value: 15
    }
  ]
};

export default BoneArmor;
