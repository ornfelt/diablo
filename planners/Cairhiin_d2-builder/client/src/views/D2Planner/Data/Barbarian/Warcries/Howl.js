const Howl = {
  id: "t3r1c1",
  name: "Howl",
  description: "Frightens monsters, causing them to run in fear",
  data: {
    "Flee Distance": slvl => `${Math.floor((19 + (5*slvl)) * 2/3)} yards`,
    "Flee Duration": slvl => `${2+slvl} seconds`,
    "Mana Cost": () => 4
  },
  dependencies: []
};

export default Howl;
