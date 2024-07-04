const ChillingArmor = {
  id: "t3r5c3",
  name: "Chilling Armor",
  description: "Confers a defense bonus and launches an ice bolt against ranged attackers",
  data: {
    "Bonus Defense": slvl => `+${45 + (slvl - 1) * 5}%`,
    "Duration": (slvl, dlvl=[0, 0, 0, 0])  => {
      let extraSeconds = dlvl[0] * ChillingArmor.dependencies[0].value + dlvl[2] * ChillingArmor.dependencies[2].value;
      return `${(extraSeconds + 144 + (slvl - 1) * 6)} seconds`;
    },
    "Cold Damage": function(slvl, dlvl=[0, 0, 0, 0]) {
      let dmgMultiplier = dlvl[1] * ChillingArmor.dependencies[1].value + dlvl[3] * ChillingArmor.dependencies[3].value;
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let min = 11*slvl - 25;
      let max = 11*slvl + 74;
      if (slvl < 9) {
        min = slvl + 3;
        max = Math.floor(1.5*slvl + 4.5);
      }
      else if (slvl < 17) {
        min = 2*slvl - 5;
        max = Math.floor(2.5*slvl - 3.5);
      }
      else if (slvl < 23) {
        min = 3*slvl - 21;
        max = Math.floor(3.5*slvl - 19.5);
      }
      else if (slvl < 29) {
        min = 4*slvl - 43;
        max = Math.floor(4.5*slvl - 41.5);
      }
      return { min: dmgMultiplier*(min), max: dmgMultiplier*(max) };
    },
    "Cold Duration": slvl => {
      if (slvl < 9) return 4;
      return (25*slvl - 100) / 25;
    },
    "Mana Cost": () => 17
  },
  dependencies: [
      {
        id: "t3r1c3",
        name: "Frozen Armor",
        description: "+{V} seconds per level",
        value: 10
      },
      {
        id: "t3r1c3",
        name: "Frozen Armor",
        description: "+{V}% Cold damage per level",
        value: 7
      },
      {
        id: "t3r3c3",
        name: "Shiver Armor",
        description: "+{V} seconds per level",
        value: 10
      },
      {
        id: "t3r3c3",
        name: "Shiver Armor",
        description: "+{V}% Cold damage per level",
        value: 7
      }
    ]
};

export default ChillingArmor;
