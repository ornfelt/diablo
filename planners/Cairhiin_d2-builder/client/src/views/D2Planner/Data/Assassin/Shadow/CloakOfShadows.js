const CloakOfShadows = {
  id: "t2r3c3",
  name: "Cloak of Shadows",
  description: "Hides the Assassin, allowing her to attack with greater accuracy",
  data: {
    "Defense": slvl => `+${7 + (3*slvl)}%`,
    "Enemy Defense": slvl => `-${Math.min((3*slvl) + 12, 95)}%`,
    "Duration": slvl => `${7+slvl} seconds`,
    "Mana Cost": () => 13
  },
  dependencies: []
};

export default CloakOfShadows;
