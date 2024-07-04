const TigerStrike = {
  id: "t3r1c2",
  name: "Tiger Strike",
  description: "Attacks an enemy and stores a charge",
  data: {
    "Attack Rating": slvl => `+${8 + (7*slvl)}%`,
    "Increased Damage per Charge": slvl => `+${8 + (80 + (20*slvl))}%`,
    "Mana Cost": () => 1
  },
  dependencies: []
};

export default TigerStrike;
