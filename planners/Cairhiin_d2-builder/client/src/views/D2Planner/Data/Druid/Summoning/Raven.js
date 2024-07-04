const Raven = {
  id: "t1r1c2",
  name: "Raven",
  description: "Summon Ravens to peck out the eyes of your enemies",
  data: {
    "Max Ravens": slvl => Math.min(slvl, 5),
    "Attacks": slvl => 11+slvl,
    "Damage": slvl => ({ min: slvl+1, max: slvl+3 }),
    "Mana": () => 6
  },
  dependencies: []
};

export default Raven;
