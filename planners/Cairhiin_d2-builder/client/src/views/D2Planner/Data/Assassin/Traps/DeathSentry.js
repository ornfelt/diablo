const DeathSentry = {
  id: "t1r6c1",
  name: "Death Sentry",
  description: "Drops a modified Lightning Sentry that also Corpse Explodes",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier = dlvl[1] * DeathSentry.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = (8*slvl) + 42;
      if (slvl > 28)  { max = (34*slvl) - 434; }
      if (slvl > 22)  { max = (28*slvl) - 266; }
      if (slvl > 16)  { max = (22*slvl) - 134; }
      if (slvl > 8) { max = (14*slvl) - 6; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Shots": (slvl, dlvl=[0, 0]) => 5 + Math.floor((dlvl[0] * DeathSentry.dependencies[0].value) / 4),
    "Radius": slvl => Math.round((((9+slvl) / 2 * 2/3) / 100) * 10) / 10,
    "Mana Cost": () => 20
  },
  dependencies: [
    {
      id: "t1r1c2",
      name: "Fire Blast",
      description: "+{V} Shot per 4 levels",
      value: 1
    },
    {
      id: "t1r5c1",
      name: "Lightning Sentry",
      description: "+{V}% Lightning Damage per level",
      value: 12
    }
  ]
};

export default DeathSentry;
