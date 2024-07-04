const Berserk = {
  id: "t1r6c2",
  name: "Berserk",
  description: "A powerful attack that leaves the Barbarian more vulnerable",
  data: {
    "Attack Rating": slvl => `+${85 + (15*slvl)}%`,
    "Magic Damage": (slvl, dlvl=[0, 0]) => `+${135 + (15*slvl) +
        dlvl[0] * Berserk.dependencies[0].value +
        dlvl[1] * Berserk.dependencies[1].value}%`,
    "Duration": slvl => `${3 - Math.min(Math.floor(50*((110*slvl)/(slvl+6))/100) / 25, 2)} seconds`,
    "Mana Cost": () => 4
  },
  dependencies: [
    {
      id: "t3r1c1",
      name: "Howl",
      description: "+{V}% Damage per level",
      value: 10
    },
    {
      id: "t3r2c2",
      name: "Shout",
      description: "+{V}% Damage per level",
      value: 10
    }
  ]
};

export default Berserk;
