const BattleCry = {
  id: "t3r4c1",
  name: "Battle Cry",
  description: "Lowers the nearby opponents' defense and damage",
  data: {
    "Damage": slvl => `-${24+slvl}%`,
    "Defense": slvl => `-${48 + (2*slvl)}%`,
    "Duration": slvl => `-${9.6 + (2.4*slvl)} seconds`,
    "Mana Cost": () => 5
  },
  dependencies: []
};

export default BattleCry;
