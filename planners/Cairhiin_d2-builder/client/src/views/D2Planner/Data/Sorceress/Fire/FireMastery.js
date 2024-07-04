const FireMastery = {
  id: "t1r6c2",
  name: "Fire Mastery",
  description: "Increases damage done by all fire spells",
  data: {
    "Increased Fire Damage": slvl => `${23 + 7*slvl}%`
  },
  dependencies: []
};

export default FireMastery;
