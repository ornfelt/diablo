const MultipleShot = {
  id: "t1r2c2",
  name: "Multiple Shot",
  description: "Splits one arrow into many at reduced damage",
  data: {
    "Damage": () => '75% Weapon Damage',
    "Arrows": slvl => Math.min(1+slvl, 24),
    "Mana Cost": slvl => 3 + slvl
  },
  dependencies: []
};

export default MultipleShot;
