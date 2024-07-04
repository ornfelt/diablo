const PhoenixStrike = {
  id: "t3r6c2",
  name: "Phoenix Strike",
  description: "A finishing move that deals fire, lightning and cold damage all at once",
  data: {
    "Attack Rating": slvl => `+${8 + (7*slvl)}%`,
    "Charge 1 - Meteor Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * PhoenixStrike.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (10*slvl) + 10;
      let max = (10*slvl) + 30;
      if (slvl > 28)  { min = (46*slvl) - 644; max = (50*slvl) - 672; }
      if (slvl > 22)  { min = (38*slvl) - 420; max = (42*slvl) - 448; }
      if (slvl > 16)  { min = (29*slvl) - 222; max = (33*slvl) - 250; }
      if (slvl > 8) { min = (19*slvl) - 62; max = (21*slvl) - 58; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Average Fire Damage per second": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[1] * PhoenixStrike.dependencies[1].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (40*slvl) + 8;
      let max = (40*slvl) + 40;
      if (slvl > 28)  { min = (240*slvl) - 3928; max = (256*slvl) - 4200; }
      if (slvl > 22)  { min = (176*slvl) - 2136; max = (192*slvl) - 2408; }
      if (slvl > 16)  { min = (128*slvl) - 1080; max = (136*slvl) - 1176; }
      if (slvl > 8) { min = (80*slvl) - 312; max = (80*slvl) - 280; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Charge 2 - Chain Lightning Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[2] * PhoenixStrike.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let max = (20*slvl) + 20;
      if (slvl > 28)  { max = (100*slvl) - 1460; }
      if (slvl > 22)  { max = (80*slvl) - 900; }
      if (slvl > 16)  { max = (60*slvl) - 460; }
      if (slvl > 8) { max = (40*slvl) - 140; }
      return { min: 1, max: dmgMultiplier*max };
    },
    "Charge 3 - Frozen Orb Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[3] * PhoenixStrike.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (4*slvl) + 12;
      let max = (4*slvl) + 28;
      if (slvl > 28)  { min = (28*slvl) - 484; max = (29*slvl) - 484; }
      if (slvl > 22)  { min = (20*slvl) - 260; max = (21*slvl) - 260; }
      if (slvl > 16)  { min = (12*slvl) - 8; max = (13*slvl) - 84; }
      if (slvl > 8) { min = (8*slvl) - 20; max = (8*slvl) - 4; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Freeze Duration": function(slvl) {
      let dur = (10*slvl) + 90;
      if (slvl > 16)  { dur = (20*slvl) - 30; }
      if (slvl > 8) { dur = (15*slvl) + 50; }
      return `${dur} seconds`;
    },
    "Mana Cost": () => 2
  },
  dependencies: [
    {
      id: "t3r2c1",
      name: "Fists of Fire",
      description: "+{V}% Fire Damage per level",
      value: 10
    },
    {
      id: "t3r2c1",
      name: "Fists of Fire",
      description: "+{V}% Average Fire Damage per level",
      value: 6
    },
    {
      id: "t3r4c1",
      name: "Claws of Thunder",
      description: "+{V}% Lightning Damage per level",
      value: 13
    },
    {
      id: "t3r5c1",
      name: "Blades of Ice",
      description: "+{V}% Cold Damage per level",
      value: 10
    }
  ]
};

export default PhoenixStrike;
