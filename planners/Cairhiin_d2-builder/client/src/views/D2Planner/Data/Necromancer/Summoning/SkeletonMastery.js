const SkeletonMastery = {
  id: "t3r1c1",
  name: "Skeleton Mastery",
  description: "Improves the quality of your raised Skeletons, Magi, and Revived",
  data: {
    "Skeleton Damage": slvl => `+${2*slvl}`,
    "Skeleton Life": slvl => `+${8*slvl}`,
    "Skeletal Mage Life": slvl => `+${8*slvl}`,
    "Revived Damage": slvl => `+${10*slvl}%`,
    "Revived Life": slvl => `+${5*slvl}%`
  },
  dependencies: []
};

export default SkeletonMastery;
