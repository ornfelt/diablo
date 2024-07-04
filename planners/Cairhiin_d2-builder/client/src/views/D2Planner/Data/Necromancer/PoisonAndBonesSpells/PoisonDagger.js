const PoisonDagger = {
  id: "t2r2c1",
  name: "Poison Dagger",
  description: "Coats your weapon with a layer of poison",
  data: {
    "Poison Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * PoisonDagger.dependencies[0].value +
        dlvl[1] * PoisonDagger.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 16 + (20*slvl);
      let max = 60 + (20*slvl);
      if (slvl > 28) { min = (52*slvl) - 524; max = (52*slvl) - 480; }
      if (slvl > 22) { min = (46*slvl) - 356; max = (46*slvl) - 312; }
      if (slvl > 16) { min = (40*slvl) - 224; max = (40*slvl) - 180; }
      if (slvl > 8) { min = (30*slvl) - 64; max = (30*slvl) - 20; }
      return { min: dmgMultiplier*min*((40+slvl*10)/256), max: dmgMultiplier*max*((40+slvl*10)/256) };
    },
    "Poison Duration": slvl => `${1.6 + (0.4*slvl)} seconds`,
    "Mana Cost": slvl => 2.75 + (0.25*slvl)
  },
  dependencies: [
      {
        id: "t2r4c1",
        name: "Poison Explosion",
        description: "+{V}% Poison Damage per level",
        value: 20
      },
      {
        id: "t2r6c1",
        name: "Poison Nova",
        description: "+{V}% Poison Damage per level",
        value: 20
      }
    ]
};

export default PoisonDagger;
