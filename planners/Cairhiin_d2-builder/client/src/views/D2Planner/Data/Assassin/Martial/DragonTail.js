const DragonTail = {
  id: "t3r4c3",
  name: "Dragon Tail",
  description: "A powerful kick that explodes on impact; damage is based on boot damage not weapon damage",
  data: {
    "Attack Rating": slvl => `+${(15*slvl) + 5}%`,
    "Fire Damage": slvl => `+${40 + (10*slvl)}%`,
    "Mana Cost": () => 10
  },
  dependencies: []
};

export default DragonTail;
