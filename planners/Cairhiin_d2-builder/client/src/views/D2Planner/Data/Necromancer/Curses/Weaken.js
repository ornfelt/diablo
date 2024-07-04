const Weaken = {
  id: "t1r2c3",
  name: "Weaken",
  description: "Decreases the damage dealt by enemies caught inside the curse",
  data: {
    "Damage":() => '-33%',
    "Radius": slvl => `${Math.floor((((16 + (2*slvl)) / 3))*10)/10} yards`,
    "Duration": slvl => `${11.6 + (2.4*slvl)} seconds`,
    "Mana Cost": slvl => 4
  },
  dependencies: []
};

export default Weaken;
