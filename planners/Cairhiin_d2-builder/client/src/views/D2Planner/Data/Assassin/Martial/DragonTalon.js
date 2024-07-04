const DragonTalon = {
  id: "t3r1c3",
  name: "Dragon Talon",
  description: "Attacks an enemy with a flurry of kicks; damage is based on boot damage not weapon damage",
  data: {
    "Attack Rating": slvl => `+${(35*slvl) - 15}%`,
    "Damage": slvl => `+${(7*slvl) - 2}%`,
    "Kicks": slvl => 1 + Math.floor(slvl/6),
    "Mana Cost": () => 5
  },
  dependencies: []
};

export default DragonTalon;
