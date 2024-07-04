const Hurricane = {
  id: "t3r6c2",
  name: "Hurricane",
  description: "Manipulates a strong force of wind to surround your character",
  data: {
    "Cold Damage": function(slvl, dlvl=[0, 0, 0]) {
      let dmgMultiplier = dlvl[1] * Hurricane.dependencies[1].value +
          dlvl[2] * Hurricane.dependencies[2].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = (7*slvl) + 18;
      let max = (7*slvl) + 43;
      if (slvl > 28)  { min = (16*slvl) - 138; max = (16*slvl) - 113; }
      if (slvl > 22)  { min = (14*slvl) - 82; max = (14*slvl) - 57; }
      if (slvl > 16)  { min = (12*slvl) - 38; max = (12*slvl) - 13; }
      if (slvl > 8) { min = (10*slvl) - 6; max = (10*slvl) + 19; }
      return { min: dmgMultiplier*min*1.25 , max: dmgMultiplier*max*1.25 };
    },
    "Duration": (slvl, dlvl=[0, 0, 0]) =>
        `${10 + dlvl[0] * Hurricane.dependencies[0].value} seconds`,
    "Mana Cost": () => 30
  },
  dependencies: [
      {
        id: "t3r3c3",
        name: "Cyclone Armor",
        description: "+{V} seconds per level",
        value: 2
      },
      {
        id: "t3r4c2",
        name: "Twister",
        description: "+{V}% Cold Damage per level",
        value: 9
      },
      {
        id: "t3r6c2",
        name: "Tornado",
        description: "+{V}% Cold Damage per level",
        value: 9
      }
    ]
};

export default Hurricane;
