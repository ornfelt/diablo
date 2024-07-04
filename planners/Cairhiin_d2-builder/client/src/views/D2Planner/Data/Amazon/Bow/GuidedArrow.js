const GuidedArrow = {
  id: "t1r4c2",
  name: "Guided Arrow",
  description: "Imbues an arrow with the ability to seek its nearest target",
  data: {
    "Damage Increase": slvl => `+${5*slvl - 5}%`,
    "Mana Cost": slvl => Math.max(8.25 - (0.25*slvl), 1),
  },
  dependencies: []
};

export default GuidedArrow;
