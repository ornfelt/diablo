const SlowMissile = {
  id: "t2r3c1",
  name: "Slow Missiles",
  description: "Slows the speed of incoming missile attacks",
  data: {
    "Duration": slvl => `${6 + (6*slvl)} seconds`,
    "Ranged Attacks slowed by": '33%',
    "Mana Cost": () => 5
  },
  dependencies: []
};

export default SlowMissile;
