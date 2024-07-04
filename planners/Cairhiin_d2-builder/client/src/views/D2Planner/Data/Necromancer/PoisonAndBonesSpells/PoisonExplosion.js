const PoisonExplosion = {
  id: "t2r4c1",
  name: "Poison Explosion",
  description: "Releases a cloud of poisonous gas from a corpse",
  data: {
    "Poison Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * PoisonExplosion.dependencies[0].value +
        dlvl[1] * PoisonExplosion.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 96 + (32*slvl);
      let max = 352 + (32*slvl);
      if (slvl > 28) { min = (160*slvl) - 2272; max = (160*slvl) - 2016; }
      if (slvl > 22) { min = (128*slvl) - 1376; max = (128*slvl) - 1120; }
      if (slvl > 16) { min = (96*slvl) - 672; max = (96*slvl) - 416; }
      if (slvl > 8) { min = (64*slvl) - 160; max =  (64*slvl) + 96; }
      return { min: dmgMultiplier*min*((40+slvl*10)/256), max: dmgMultiplier*max*((40+slvl*10)/256) };
    },
    "Poison Duration": slvl => `${1.6 + (0.4*slvl)} seconds`,
    "Mana Cost": slvl => 8
  },
  dependencies: [
      {
        id: "t2r2c1",
        name: "Poison Dagger",
        description: "+{V}% Poison Damage per level",
        value: 15
      },
      {
        id: "t2r6c1",
        name: "Poison Nova",
        description: "+{V}% Poison Damage per level",
        value: 15
      }
    ]
};

export default PoisonExplosion;
