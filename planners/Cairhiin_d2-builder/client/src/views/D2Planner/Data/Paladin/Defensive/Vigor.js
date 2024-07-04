const Vigor = {
  id: "t3r4c2",
  name: "Vigor",
  description: "Increases Speed, Stamina, and Stamina recovery for all party members",
  data: {
    "Movement Speed": slvl => `${Math.min(7 + Math.floor(43 * Math.round((110*slvl)/(slvl+6))/100), 50)}%`,
    "Stamina": slvl => `+${25 + (25*slvl)}%`,
    "Radius": slvl => `${Math.floor(((26 + (6*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Vigor;
