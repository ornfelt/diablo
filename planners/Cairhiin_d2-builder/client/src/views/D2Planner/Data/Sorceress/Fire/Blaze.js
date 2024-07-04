const Blaze = {
  id: "t1r3c1",
  name: "Blaze",
  description: "Leave a wall of fire in your footsteps",
  data: {
    "Average Fire Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * Blaze.dependencies[0].value + dlvl[1] * Blaze.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 32*slvl + 32;
      let max = 32*slvl + 96;
      if (slvl > 28)  { min = 144*slvl - 2400; max = 144*slvl - 2336; }
      if (slvl > 22)  { min = 96*slvl - 1056; max = 96*slvl - 992; }
      if (slvl > 16)  { min = 64*slvl - 352; max = 64*slvl - 288; }
      if (slvl > 8) { min = 48*slvl - 96; max = 48*slvl - 32; }
      return { min: dmgMultiplier*min * 3 * 25/256, max: dmgMultiplier*max * 3 * 25/256 };
    },
    "Mana Cost": (slvl) => 10 + slvl,
    "Duration": (slvl) => Math.floor((64 + (25*slvl))/25)
  },
  dependencies: [
      {
        id: "t1r1c3",
        name: "Warmth",
        description: "+{V}% Fire Damage per level",
        value: 4
      },
      {
        id: "t1r4c1",
        name: "Flame Wall",
        description: "+{V}% Fire Damage per level",
        value: 1
      }
    ]
};

export default Blaze;
