const Decrepify = {
  id: "t1r5c3",
  name: "Decrepify",
  description: "A crippling curse that halves enemy units' speed, damage and physical resistances",
  data: {
    "Damage": () => '-50%',
    "Attack Speed": () => '-50%',
    "Movement Speed": () => '-50%',
    "Physical Resist": () => '-50%',
    "Radius": slvl => '4 yards',
    "Duration": slvl => `${3.4 + (0.6*slvl)} seconds`,
    "Mana Cost": slvl => 11
  },
  dependencies: []
};

export default Decrepify;
