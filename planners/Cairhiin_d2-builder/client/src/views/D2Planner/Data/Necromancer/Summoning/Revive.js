const Revive = {
  id: "t3r6c3",
  name: "Revive",
  description: "Resurrects a monster to fight for you",
  data: {
    "Reviveds": slvl => slvl,
    "Life": (slvl, dlvl=[0, 0]) => `+${200 + dlvl[0] * 5}%`,
    "Damage": (slvl, dlvl=[0, 0])  => `+${dlvl[0] * 10}%`,
    "Duration": () => '180 seconds',
    "Mana": slvl => 45
  },
  dependencies: [
    {
      id: "t3r1c1",
      name: "Skeleton Mastery",
    },
    {
      id: "t3r5c1",
      name: "Summon Resist",
    }
  ]
};

export default Revive;
