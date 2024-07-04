const ClawMastery = {
  id: "t2r1c2",
  name: "Claw Mastery",
  description: "Increase combat efficiency with claw-type weapons",
  data: {
    "Attack Rating": slvl => `+${(10*slvl) + 20}%`,
    "Damage": slvl => `+${31 + (4*slvl)}%`,
    "Critical Strike": slvl => `+${Math.min(Math.floor((25 * ((110*slvl)/(slvl+6)) / 100)), 25)}%`
  },
  dependencies: []
};

export default ClawMastery;
