const DragonFlight = {
  id: "t3r5c3",
  name: "Dragon Flight",
  description: "Teleports to an enemy and kicks it; damage is based on boot damage not weapon damage",
  data: {
    "Attack Rating": slvl => `+${(25*slvl) + 35}%`,
    "Damage": slvl => `+${75 + (25*slvl)}%`,
    "Mana Cost": () => 15
  },
  dependencies: []
};

export default DragonFlight;
