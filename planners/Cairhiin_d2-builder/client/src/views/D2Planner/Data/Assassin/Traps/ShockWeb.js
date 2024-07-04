const ShockWeb = {
  id: "t1r2c1",
  name: "Shock Web",
  description: "Drops a small trap that deals lightning damage to anything nearby",
  data: {
    "Lightning Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[1] * ShockWeb.dependencies[1].value +
        dlvl[2] * ShockWeb.dependencies[2].value +
        dlvl[3] * ShockWeb.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = (3*slvl)+7;
      if (slvl > 28)  { max = (21*slvl)-359; }
      if (slvl > 22)  { max = (15*slvl)-191; }
      if (slvl > 16)  { max = (10*slvl)-81	; }
      if (slvl > 8) { max = (6*slvl)-17; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Missiles": function(slvl, dlvl=[0, 0, 0, 0]) {
      Math.floor(Math.floor((6+slvl)/4) * ((dlvl[0] * ShockWeb.dependencies[0].value) / 3));
    },
    "Mana Cost": () => 6
  },
  dependencies: [
    {
      id: "t1r1c2",
      name: "Fire Blast",
      description: "+{V} Missile per 3 levels",
      value: 1
    },
    {
      id: "t1r3c1",
      name: "Charged Bolt Sentry",
      description: "+{V}% Lightning Damage per level",
      value: 11
    },
    {
      id: "t1r5c1",
      name: "Lightning Sentry",
      description: "+{V}% Lightning Damage per level",
      value: 11
    },
    {
      id: "t1r6c1",
      name: "Death Sentry",
      description: "+{V}% Lightning Damage per level",
      value: 11
    }
  ]
};

export default ShockWeb;
