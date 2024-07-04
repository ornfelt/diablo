const Cleansing = {
  id: "t3r3c1",
  name: "Cleansing",
  description: "Reduces Poison and Curse duration for all party members",
  data: {
    "Curse and Poison Duration": slvl => `-${Math.min(30 + (60 * Math.round((110*slvl)/(slvl+6))/100), 90)}%`,
    "Radius": slvl => `${Math.floor(((28 + (4*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Cleansing;
