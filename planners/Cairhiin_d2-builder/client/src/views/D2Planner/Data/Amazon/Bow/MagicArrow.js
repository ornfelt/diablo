const MagicArrow = {
  id: "t1r1c2",
  name: "Magic Arrow",
  description: "Attacks with a magical arrow or bolt",
  data: {
    "Converts": slvl => `${slvl}% of Physical Damage to Magic Damage`,
    "Damage": slvl => ({ min: slvl, max: slvl }),
    "Attack Rating": slvl => `${1 + (9*slvl)}%`,
    "Mana Cost": slvl => Math.max(1.625 - (0.125*slvl), 0)
  },
  dependencies: []
};

export default MagicArrow;
