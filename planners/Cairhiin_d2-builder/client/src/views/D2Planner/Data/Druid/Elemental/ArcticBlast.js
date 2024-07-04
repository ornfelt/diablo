const ArcticBlast = {
  id: "t3r2c3",
  name: "Arctic Blast",
  description: "A spout of ice that freezes your enemies",
  data: {
    "Average Cold Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * ArcticBlast.dependencies[0].value +
          dlvl[1] * ArcticBlast.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (64*slvl) + 20;
      let max = (64*slvl) + 96;
      if (slvl > 28)  { min = (116*slvl) - 1084; max = (124*slvl) - 1152; }
      if (slvl > 22)  { min = (96*slvl) - 524; max = (100*slvl) - 480; }
      if (slvl > 16)  { min = (80*slvl) - 172; max = (84*slvl) - 128; }
      if (slvl > 8) { min = (72*slvl) - 44; max = 76*slvl; }
      return { min: dmgMultiplier*min * (25/256), max: dmgMultiplier*max * (25/256) };
    },
    "Range": slvl => Math.round((((33 + (2*slvl)) / 4) * 2/3) * 10) / 10,
    "Mana Cost": slvl => `${Math.round(((23+slvl) * 25/128) * 10) / 10} per second`
  },
  dependencies: [
      {
        id: "t3r3c3",
        name: "Cyclone Armor",
        description: "+{V}% Cold Damage per level",
        value: 15
      },
      {
        id: "t3r6c2",
        name: "Hurricane",
        description: "+{V}% Cold Damage per level",
        value: 15
      }
    ]
};

export default ArcticBlast;
