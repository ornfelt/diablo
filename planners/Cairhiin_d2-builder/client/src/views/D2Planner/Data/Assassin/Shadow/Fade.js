const Fade = {
  id: "t2r4c1",
  name: "Fade",
  description: "Partially phases the Assassin to another plane allowing her to avoid some magical attacks",
  data: {
    "Resist All": slvl => `+${Math.min(10 + Math.floor((65*((110*slvl)/(slvl+6))/100)), 75)}%`,
    "Reduce Curse Duration": slvl => `${Math.min(40 + Math.floor((50*((110*slvl)/(slvl+6))/100)), 90)}%`,
    "Duration": slvl => `${108 + (12*slvl)} seconds`,
    "Mana Cost": () => 10
  },
  dependencies: []
};

export default Fade;
