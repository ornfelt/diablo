const Fend = {
  id: "t3r5c1",
  name: "Fend",
  description: "Rapidly strikes several close targets",
  data: {
    "Attack Rating": slvl => `${30 + (10*slvl)}%`,
    "Damage": slvl => `${60 + (10*slvl)}%`,
    "Mana Cost": () => 5
  },
  dependencies: []
};

export default Fend;
