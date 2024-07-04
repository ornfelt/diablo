const Fanaticism = {
  id: "t2r6c1",
  name: "Fanaticism",
  description: "Increases your Damage, Attack Speed and Attack Rating. Increases Damage for all party members",
  data: {
    "Damage": slvl => `+${33 + (17*slvl)}%`,
    "Allies Damage": slvl => `+${Math.floor((33 + (17*slvl))/2)}%`,
    "Attack Speed": slvl => `+${Math.min(10 + (30 * Math.round((110*slvl)/(slvl+6))/100), 40)}%`,
    "Attack Rating": slvl => `+${35 + (5*slvl)}%`,
    "Radius": slvl => `${Math.floor(((20 + (2*slvl) ) / 3)*10)/10} yards`
  },
  dependencies: []
};

export default Fanaticism;
