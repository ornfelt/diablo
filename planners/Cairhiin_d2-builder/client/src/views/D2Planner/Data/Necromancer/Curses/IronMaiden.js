const IronMaiden = {
  id: "t1r3c2",
  name: "Iron Maiden",
  description: "Reflects damage back at attackers",
  data: {
    "Damage Reflected": slvl => `${175 + (25*slvl)}%`,
    "Radius": slvl => '4.6 yards',
    "Duration": slvl => `${9.6 + (2.4*slvl)} seconds`,
    "Mana Cost": slvl => 5
  },
  dependencies: []
};

export default IronMaiden;
