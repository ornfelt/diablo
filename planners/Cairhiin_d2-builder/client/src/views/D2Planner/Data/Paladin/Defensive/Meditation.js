const Meditation = {
  id: "t3r5c1",
  name: "Meditation",
  description: "Boosts Mana recovery for all party members",
  data: {
    "Regenerate Mana": slvl => `+${275 + (25*slvl)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Meditation;
