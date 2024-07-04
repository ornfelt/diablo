const Prayer = {
  id: "t3r1c1",
  name: "Prayer",
  description: "Heals all party members at the expense of the caster's Mana reserves",
  data: {
    "Life Healed": function(slvl) {
      let heal = slvl+1;
      if (slvl > 28) { heal = (3*slvl) - 43; }
      if (slvl > 16) { heal = (2*slvl) - 15; }
      return heal;
    },
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`,
    "Mana Cost": slvl => 0.8125 + (0.1875*slvl)
  },
  dependencies: []
};

export default Prayer;
