const RaiseSkeleton = {
  id: "t3r1c3",
  name: "Raise Skeleton",
  description: "Raise an undead warrior from a corpse to fight for you",
  data: {
    "Skeletons": slvl => {
      if (slvl < 4) return slvl;
      return Math.floor(2+slvl/3);
    },
    "Life": (slvl, dlvl=[0, 0]) => {
      let life = 21 + 8*dlvl[0];
      let lifeMulti = 1;
      if (slvl > 3) {
        lifeMulti = (Math.round(1+(-150+(50*slvl) / 100))*100)/100;
      }
      return life*lifeMulti;
    },
    "Damage": function(slvl, dlvl=[0, 0]) {
      let dmgMultiplier =  7*slvl - 21;
      if (slvl<4) {
        dmgMultiplier = 0;
      }
      dmgMultiplier = Math.round((dmgMultiplier / 100 + 1)*100) / 100;
      let dmgAdd = dlvl[0] * 2;
      let min = 1;
      let max = 2;
      if (slvl > 28)  { min = 4*slvl - 73; max = 4*slvl - 72; }
      if (slvl > 22)  { min = 3*slvl - 45; max = 3*slvl - 44; }
      if (slvl > 16)  { min = 2*slvl - 23; max = 2*slvl - 22; }
      if (slvl > 8) { min = slvl-7; max = slvl-6; }
      return { min: (dmgAdd+min)*dmgMultiplier, max: (dmgAdd+max)*dmgMultiplier };
    },
    "Mana": slvl => 5+slvl
  },
  dependencies: [
    {
      id: "t3r1c1",
      name: "Skeleton Mastery",
    },
    {
      id: "t3r5c1",
      name: "Summon Resist",
    }
  ]
};

export default RaiseSkeleton;
