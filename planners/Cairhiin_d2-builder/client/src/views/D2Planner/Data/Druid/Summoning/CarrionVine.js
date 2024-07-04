const CarrionVine = {
  id: "t1r3c3",
  name: "Carrion Vine",
  description: "Summons a vine that eats corpses and gives the Druid life",
  data: {
    "Life": slvl =>	Math.floor(((80*(75+(25*slvl))/100)+(110*(75+(25*slvl))/100))/2),
    "Heals": slvl => `+${Math.min(3+Math.floor((9*((110*slvl)/(slvl+6))/100)), 12)}%`,
    "Mana": () => 10
  },
  dependencies: []
};

export default CarrionVine;
