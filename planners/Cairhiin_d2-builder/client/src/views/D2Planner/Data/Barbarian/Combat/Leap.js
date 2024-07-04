const Leap = {
  id: "t1r2c1",
  name: "Leap",
  description: "Jumps into the air, knocking back foes at your landing point",
  data: {
    "Range": slvl => `+${Math.floor((Math.min(4 +
      (26 * Math.floor((110*slvl) / (slvl+6)) / 100), 30) * 2 / 3) * 10) / 10} yards`,
    "Mana Cost": () => 2
  },
  dependencies: []
};

export default Leap;
