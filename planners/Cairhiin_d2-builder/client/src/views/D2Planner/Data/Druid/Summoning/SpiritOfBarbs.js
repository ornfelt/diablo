const SpiritOfBarbs = {
  id: "t1r6c1",
  name: "Spirit of Barbs",
  description: "Summons a spirit that reflects damage back at attackers",
  data: {
    "Life": slvl =>	Math.floor(((220*(75+(25*slvl))/100)+(226*(75+(25*slvl))/100))/2),
    "Damage Reflected": slvl => `+${10*slvl + 40}%`,
    "Radius": slvl => `+${Math.floor((2*slvl + 28) * 2/3)} yards`,
    "Mana": slvl => 24+slvl
  },
  dependencies: []
};

export default SpiritOfBarbs;
