const FeralRage = {
  id: "t2r3c1",
  name: "Feral Rage",
  description: "Leeches life from enemies, getting stronger with each attack",
  data: {
    "Attack Rating": slvl =>	`+${10 + (10*slvl)}%`,
    "Damage": slvl =>	`+${45 + (5*slvl)}%`,
    "Movement Speed": slvl =>	`19-${Math.min(10 + (60 * Math.round((110*(slvl/2 + 3))/((slvl/2 + 3) +6)) / 100), 70)}%`,
    "Life Steal": slvl =>	`4-${(4*(slvl/2 + 3))}%`,
    "Duration": slvl => '20 seconds',
    "Mana Cost": () => 3
  },
  dependencies: []
};

export default FeralRage;
