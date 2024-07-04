const CorpseExplosion = {
  id: "t2r2c2",
  name: "Corpse Explosion",
  description: "Fills a corpse with energy causing it to explode violently",
  data: {
    "Damage": '70-120% of monster life',
    "Physical Damage Radius": slvl => ((7+slvl) / 2) * 2/3,
    "Fire Damage Radius": slvl => ((8+slvl) / 2) * 2/3,
    "Mana Cost": slvl => 14+slvl
  },
  dependencies: []
};

export default CorpseExplosion;
