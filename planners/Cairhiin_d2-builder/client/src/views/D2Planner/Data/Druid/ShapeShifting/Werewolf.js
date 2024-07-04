const Werewolf = {
  id: "t2r1c1",
  name: "Werewolf",
  description: "Transforms the Druid into a Werewolf",
  data: {
    "Life": (slvl, dlvl=[0, 0]) => {
      if (dlvl[0] > 0) {
        return `+${25 + 15 + dlvl[0] * Werewolf.dependencies[0].value}%`;
      }
      return '+25%';
    },
    "Stamina": () => "+25%",
    "Attack Speed": slvl => `${Math.min(10 + Math.floor(70 * Math.floor((110*slvl)/(slvl+6)) / 100), 80)}%`,
    "Attack Rating": slvl => `${35 + (15*slvl)}%`,
    "Duration": (slvl, dlvl=[0, 0]) => {
      if (dlvl[1] > 0) {
        return `+${40 + 20 + dlvl[1] * Werewolf.dependencies[1].value} seconds`;
      }
      return '40 seconds';
    },
    "Mana Cost": () => 15
  },
  dependencies: [
    {
      id: "t2r1c2",
      name: "Lycanthropy",
      description: "+{V}% Life per level",
      value: 5
    },
    {
      id: "t2r1c2",
      name: "Lycanthropy",
      description: "+{V} seconds per level",
      value: 20
    }
  ]
};

export default Werewolf;
