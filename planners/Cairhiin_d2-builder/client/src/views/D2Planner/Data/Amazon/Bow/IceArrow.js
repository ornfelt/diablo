const IceArrow = {
  id: "t1r4c1",
  name: "Ice Arrow",
  description: "Enchants arrows that deal additional cold damage and will temporarily freeze the target",
  data: {
    "Attack Rating": slvl => `${11 + (9*slvl)}%`,
    "Cold Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * IceArrow.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 6*slvl;
      let max = 4 + 6*slvl;
      if (slvl > 28)  { min = 36*slvl - 600; max = 38*slvl - 632; }
      if (slvl > 22)  { min = 26*slvl - 320; max = 27*slvl - 324; }
      if (slvl > 16)  { min = 18*slvl - 144; max = 19*slvl - 148; }
      if (slvl > 8) { min = 2*slvl - 48; max = 13*slvl - 52	; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Freeze Duration": function(slvl, dlvl=[0, 0]) {
      let durationMultiplier = dlvl[2] * IceArrow.dependencies[1].value;
      durationMultiplier = Math.round((durationMultiplier / 100 + 1)*100) / 100;
      return `${durationMultiplier * (Math.floor((45 + (5*slvl) / 25)))} seconds`
    },
    "Mana Cost": slvl => 3.75 + (0.25*slvl)
  },
  dependencies: [
    {
      id: "t1r2c1",
      name: "Cold Arrow",
      description: "+{V}% Cold Damage per level",
      value: 8
    },
    {
      id: "t1r6c1",
      name: "Freezing Arrow",
      description: "+{V}% Freeze Duration per level",
      value: 5
    }
  ]
};

export default IceArrow;
