const PoisonNova = {
  id: "t2r6c1",
  name: "Poison Nova",
  description: "A ring of poison explodes from the Necromancer",
  data: {
    "Poison Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[0] * PoisonNova.dependencies[0].value +
        dlvl[1] * PoisonNova.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (64*slvl) + 192;
      let max = (64*slvl) + 400;
      if (slvl > 28) { min = (256*slvl) - 3488; max = (256*slvl) - 3280; }
      if (slvl > 22) { min = (224*slvl) - 2592; max = (224*slvl) - 2384; }
      if (slvl > 16) { min = (144*slvl) - 832; max = (144*slvl) - 624; }
      if (slvl > 8) { min = (96*slvl) - 64; max =  (96*slvl) + 144; }
      return { min: dmgMultiplier*min*(50/256), max: dmgMultiplier*max*(50/256) };
    },
    "Poison Duration": () => '2 seconds',
    "Mana Cost": slvl => 20
  },
  dependencies: [
      {
        id: "t2r2c1",
        name: "Poison Dagger",
        description: "+{V}% Poison Damage per level",
        value: 10
      },
      {
        id: "t2r4c1",
        name: "Poison Explosion",
        description: "+{V}% Poison Damage per level",
        value: 10
      }
    ]
};

export default PoisonNova;
