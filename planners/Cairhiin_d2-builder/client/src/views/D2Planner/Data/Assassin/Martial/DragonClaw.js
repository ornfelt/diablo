const DragonClaw = {
  id: "t3r2c3",
  name: "Dragon Claw",
  description: "Attack an enemy with both weapons simultaneously",
  data: {
    "Attack Rating": slvl => `+${(25*slvl) + 15}%`,
    "Damage": function(slvl, dlvl=[0]) {
      let dmgMultiplier = dlvl[0] * DragonClaw.dependencies[0].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      return `+${dmgMultiplier*((5*slvl) + 45)}%`
    },
    "Mana Cost": () => 2
  },
  dependencies: [
    {
      id: "t2r1c2",
      name: "Claw Mastery",
      description: "+{V}% Damage per level",
      value: 4
    }
  ]
};

export default DragonClaw;
