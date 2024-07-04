const LifeTap = {
  id: "t1r4c2",
  name: "Life Tap",
  description: "Curses an enemy, causing them to grant life to their attackers",
  data: {
    "Life Steal":() => '50%',
    "Radius": slvl => `${Math.floor((((6 + (2*slvl) ) / 3))*10)/10} yards`,
    "Duration": slvl => `${13.6 + (2.4*slvl)} seconds`,
    "Mana Cost": slvl => 9
  },
  dependencies: []
};

export default LifeTap;
