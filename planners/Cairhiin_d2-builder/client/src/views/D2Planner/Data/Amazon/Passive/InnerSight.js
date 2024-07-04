const InnerSight = {
  id: "t2r1c1",
  name: "Inner Sight",
  description: "Illuminates foes, and lowers their defenses",
  data: {
    "Enemy Defense": function(slvl) {
      let def = 25*slvl + 15;
      if (slvl > 28)  { def = 100*slvl - 1385; }
      if (slvl > 22)  { def = 80*slvl - 825; }
      if (slvl > 16)  { def = 60*slvl - 385; }
      if (slvl > 8) { def = 45*slvl - 145; }
      return `-${def}`;
    },
    "Duration": slvl => `${4 + (4*slvl)} seconds`,
    "Mana Cost": () => 5
  },
  dependencies: []
};

export default InnerSight;
