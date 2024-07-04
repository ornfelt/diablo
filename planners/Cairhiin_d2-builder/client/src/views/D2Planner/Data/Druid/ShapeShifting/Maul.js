const Maul = {
  id: "t2r3c3",
  name: "Maul",
  description: "Mauls an enemy, building more strength with each hit",
  data: {
    "Attack Rating": slvl =>	`+${10 + (10*slvl)}%`,
    "Damage": slvl =>	`+${20*(slvl/2 + 3)}%`,
    "Stun Duration": slvl =>	`${Math.min(0.4 + ((90*Math.round((110*(slvl/2 + 3)) / ((slvl/2 + 3) + 6)) / 100) / 25), 4)} seconds`,
    "Duration": slvl => '20 seconds',
    "Mana Cost": () => 3
  },
  dependencies: []
};

export default Maul;
