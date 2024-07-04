const PsychicHammer = {
  id: "t2r1c3",
  name: "Psychic Hammer",
  description: "Attacks an enemy with a mental blast",
  data: {
    "Damage": function(slvl) {
      let min = slvl;
      let max = Math.floor(1.5*slvl + 1.5);
      if (slvl > 28)  { min = (3*slvl) - 37; max = Math.floor(3.5*slvl - 35.5); }
      if (slvl > 22)  { min = Math.floor(2.5*slvl - 23); max = Math.floor(3*slvl - 21.5); }
      if (slvl > 16)  { min = (2*slvl) - 12; max = Math.floor(2.5*slvl - 10.5); }
      if (slvl > 8) { min = Math.floor(1.5*slvl - 4); max = Math.floor(2*slvl - 2.5); }
      return { min: min, max: max };
    },
    "Magic Damage": function(slvl) {
      let min = slvl;
      let max = Math.floor(1.5*slvl + 1.5);
      if (slvl > 28)  { min = (3*slvl) - 37; max = Math.floor(3.5*slvl - 35.5); }
      if (slvl > 22)  { min = Math.floor(2.5*slvl - 23); max = Math.floor(3*slvl - 21.5); }
      if (slvl > 16)  { min = (2*slvl) - 12; max = Math.floor(2.5*slvl - 10.5); }
      if (slvl > 8) { min = Math.floor(1.5*slvl - 4); max = Math.floor(2*slvl - 2.5); }
      return { min: min, max: max };
    },
    "Mana Cost": (slvl) => (0.25*slvl) + 3.75,
  },
  dependencies: []
};

export default PsychicHammer;
