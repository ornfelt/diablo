const Telekinesis = {
  id: "t2r2c3",
  name: "Telekinesis",
  description: "Allows you to pick up items, trigger objects, and attack others at a distance",
  data: {
    "Lightning Damage": slvl => ({ min: slvl, max: slvl+1}),
    "Mana Cost": () => 7
  },
  dependencies: []
};

export default Telekinesis;
