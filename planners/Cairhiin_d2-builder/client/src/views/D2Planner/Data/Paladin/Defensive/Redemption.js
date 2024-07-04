const Redemption = {
  id: "t3r6c2",
  name: "Redemption",
  description: "Periodically attempts to redeem corpses for Health and Mana",
  data: {
    "Chance to Redeem Corpse": slvl => `${Math.min(10 + (90 * Math.round((110*slvl)/(slvl+6))/100), 100)}%`,
    "Life and Mana Redeemed": slvl => 20 + (5*slvl),
    "Radius": slvl => '10.3 yards'
  },
  dependencies: []
};

export default Redemption;
