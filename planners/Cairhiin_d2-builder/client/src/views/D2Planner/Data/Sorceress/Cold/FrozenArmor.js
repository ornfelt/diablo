const FrozenArmor = {
  id: "t3r1c3",
  name: "Frozen Armor",
  description: "Gives a defense bonus and freezes any melee attacker that hits you",
  data: {
    "Bonus Defense": slvl => `+${30 + (slvl - 1) * 5}%`,
    "Duration": function(slvl, dlvl=[0, 0, 0, 0]) {
      return `${(120 + (slvl - 1) * 12)
        + dlvl[0] * FrozenArmor.dependencies[0].value
        + dlvl[2] * FrozenArmor.dependencies[2].value} seconds`;
    },
    "Freeze Duration": function(slvl, dlvl=[0, 0, 0, 0]) {
      let durationMultiplier = dlvl[1] * FrozenArmor.dependencies[1].value +
        dlvl[3] * FrozenArmor.dependencies[3].value;
      durationMultiplier = Math.round((durationMultiplier / 100 + 1)*100) / 100;
      return `${durationMultiplier * (Math.floor(((27 + (3*slvl)) / 25) * 10) / 10)} seconds`;
    },
    "Mana Cost": () => 3
  },
  dependencies: [
      {
        id: "t3r3c3",
        name: "Shiver Armor",
        description: "+{V} seconds per level",
        value: 10
      },
      {
        id: "t3r3c3",
        name: "Shiver Armor",
        description: "+{V}% Freeze duration per level",
        value: 5
      },
      {
        id: "t3r5c3",
        name: "Chilling Armor",
        description: "+{V} seconds per level",
        value: 10
      },
      {
        id: "t3r5c3",
        name: "Chilling Armor",
        description: "+{V}% Freeze duration per level",
        value: 5
      }
    ]
};

export default FrozenArmor;
