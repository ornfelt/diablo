const RaiseSkeletalMage = {
  id: "t3r3c3",
  name: "Raise Skeletal Mage",
  description: "Raises an Undead Mage to fight for you",
  data: {
    "Skeletal Mages": slvl => {
      if (slvl < 4) return slvl;
      return Math.floor(2+slvl/3);
    },
    "Life": (slvl, dlvl=[0, 0]) => {
      let life = 61 + 8*dlvl[0];
      let lifeMulti = 1;
      if (slvl > 3) {
        lifeMulti = (Math.round(1+((7*slvl-21) / 100))*100)/100;
      }
      return life*lifeMulti;
    },
    "Mana": slvl => 7+slvl
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

export default RaiseSkeletalMage;
