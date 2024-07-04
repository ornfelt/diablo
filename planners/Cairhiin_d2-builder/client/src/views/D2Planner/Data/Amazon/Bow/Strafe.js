const Strafe = {
  id: "t1r5c2",
  name: "Strafe",
  description: "Fires a volley of arrows at multiple nearby targets",
  data: {
    "Damage": () => '75% Weapon Damage',
    "Damage Increase": slvl => `+${5*slvl}%`,
    "Arrows": slvl => `${Math.floor(Math.min(slvl/4 + 2, 10))}-${Math.min(slvl+3, 10)}`,
    "Mana Cost": () => 11
  },
  dependencies: []
};

export default Strafe;
