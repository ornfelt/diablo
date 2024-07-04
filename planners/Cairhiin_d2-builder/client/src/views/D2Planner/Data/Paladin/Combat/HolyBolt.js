const HolyBolt = {
  id: "t1r2c2",
  name: "Holy Bolt",
  description: "Bolt of energy that damages undead, or heals friendly units",
  data: {
    "Magic Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[1] * HolyBolt.dependencies[1].value +
        dlvl[2] * HolyBolt.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 8*slvl;
      let max = 8 + 8*slvl;
      if (slvl > 28) { min = (20*slvl) - 242; max = (23*slvl) - 286; }
      if (slvl > 22) { min = (16*slvl) - 130; max = (18*slvl) - 146; }
      if (slvl > 16) { min = (13*slvl) - 64; max = (15*slvl) - 80; }
      if (slvl > 8) { min = (10*slvl) - 16; max = (11*slvl) - 16; }
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Healing": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[0] * HolyBolt.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (2*slvl) - 1;
      let max = (4*slvl) + 2;
      return { min: dmgMultiplier*min, max: dmgMultiplier*max };
    },
    "Mana Cost": slvl => Math.round((1.9375 + (0.0625*slvl))*10) / 10
  },
  dependencies: [
      {
        id: "t3r1c1",
        name: "Prayer",
        description: "+{V}% Healing per level",
        value: 15
      },
      {
        id: "t1r4c2",
        name: "Blessed Hammer",
        description: "+{V}% Magic Damage per level",
        value: 50
      },
      {
        id: "t1r6c2",
        name: "Fist of the Heavens",
        description: "+{V}% Magic Damage per level",
        value: 50
      }
    ]
};

export default HolyBolt;
