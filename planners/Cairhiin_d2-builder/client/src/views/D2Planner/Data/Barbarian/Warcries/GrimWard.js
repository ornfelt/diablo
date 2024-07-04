const GrimWard = {
  id: "t3r5c3",
  name: "Grim Ward",
  description: "Turns a corpse into a gruesome ward, causing monsters to flee at the sight of it",
  data: {
    "Radius": slvl => `${(2+slvl) * 2/3} yards`,
    "Duration": slvl => `${40} seconds`,
    "Mana Cost": () => 4
  },
  dependencies: []
};

export default GrimWard;
