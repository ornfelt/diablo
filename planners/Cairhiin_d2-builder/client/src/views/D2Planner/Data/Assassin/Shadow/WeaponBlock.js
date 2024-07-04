const WeaponBlock = {
  id: "t2r3c2",
  name: "Weapon Block",
  description: "Allows an Assassin to Block when using two claw-type weapons",
  data: {
    "Block Chance": slvl => `+${Math.min(Math.floor((20 + 45*((110*slvl)/(slvl+6)) / 100)), 65)}%`
  },
  dependencies: []
};

export default WeaponBlock;
