const LightningMastery = {
  id: "t2r6c2",
  name: "Lightning Mastery",
  description: "Increases the damage of lightning spells",
  data: {
    "Increased Lightning Damage": slvl => `${38 + (12*slvl)}%`
  },
  dependencies: []
};

export default LightningMastery;
