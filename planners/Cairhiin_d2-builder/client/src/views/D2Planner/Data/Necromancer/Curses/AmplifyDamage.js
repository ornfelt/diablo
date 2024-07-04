const AmplifyDamage = {
  id: "t1r1c2",
  name: "Amplify Damage",
  description: "Increases the amount of damage received",
  data: {
    "Damage Taken":() => '+100%',
    "Radius": slvl => `${Math.floor(((4 + (2*slvl)) / 3)*10)/10} yards`,
    "Duration": slvl => `${5 + (3*slvl)} seconds`,
    "Mana Cost": slvl => 4
  },
  dependencies: []
};

export default AmplifyDamage;
