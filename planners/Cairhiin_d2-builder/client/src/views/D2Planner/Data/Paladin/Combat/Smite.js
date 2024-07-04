const Smite = {
  id: "t1r1c3",
  name: "Smite",
  description: "Shield bash that does damage and knock back",
  data: {
    "Shield Damage": () => '100%',
    "Damage": slvl => `+${15*slvl}%`,
    "Stun Duration": slvl => `${Math.min(Math.round((0.2*slvl + 0.4)*10)/10, 10)} seconds`,
    "Mana Cost": 2
  },
  dependencies: []
};

export default Smite;
