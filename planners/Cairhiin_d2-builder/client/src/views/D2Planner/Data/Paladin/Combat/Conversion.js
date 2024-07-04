const Conversion = {
  id: "t1r5c1",
  name: "Conversion",
  description: "A successful attack has a chance to convert the target to fight for the Paladin",
  data: {
    "Weapon Damage": () => '100%',
    "Chance to Convert": slvl => `+${Math.min(Math.round(50*((110*slvl)/(slvl+6))/100), 50)}%`,
    "Duration": slvl => '16 seconds',
    "Mana Cost": 4
  },
  dependencies: []
};

export default Conversion;
