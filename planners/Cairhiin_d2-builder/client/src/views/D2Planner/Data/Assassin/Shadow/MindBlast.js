const MindBlast = {
  id: "t2r5c3",
  name: "Mind Blast",
  description: "Mentally attacks surrounding enemies, confusing some and stunning others",
  data: {
    "Damage": function(slvl) {
      let min = (2*slvl) + 8;
      let max = (2*slvl) + 18;
      if (slvl > 16)  { min = (8*slvl) - 64; max = (8*slvl) - 54; }
      if (slvl > 8) { min = (5*slvl) - 16; max = (5*slvl) - 6; }
      return { min: min, max: max };
    },
    "Chance to Convert": slvl => `${Math.min(Math.floor(15 + (25 * ((110*slvl)/(slvl+6)) / 100)), 40)}%`,
    "Stun Duration": slvl => `${Math.min(Math.floor((0.2*slvl) + 1.8), 10)} seconds`,
    "Mana Cost": () => 15,
  },
  dependencies: []
};

export default MindBlast;
