const Venom = {
  id: "t2r6c1",
  name: "Venom",
  description: "Poisons the Assassin's weapons",
  data: {
    "Damage": function(slvl) {
      let min = 1152 + (384*slvl);
      let max = 1664 + (384*slvl);
      if (slvl > 28)  { min = (896*slvl) - 8320; max = (896*slvl) - 7808; }
      if (slvl > 22)  { min = (2.5*slvl) - 23; max = (768*slvl) - 4224; }
      if (slvl > 16)  { min = (640*slvl) - 1920; max = (640*slvl) - 1408; }
      if (slvl > 8) { min = 128 + (512*slvl); max = 640 + (512*slvl); }
      return { min: min, max: max };
    },
    "Poison Length": () => `${0.4} seconds`,
    "Duration": slvl => `${116 + (4*slvl)} seconds`,
    "Mana Cost": () => 12,
  },
  dependencies: []
};

export default Venom;
