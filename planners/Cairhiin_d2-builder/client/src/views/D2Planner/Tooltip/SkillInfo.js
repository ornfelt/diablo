import React from 'react';
import DamageInfo from './DamageInfo';
import _ from 'lodash';

const SkillInfo = ({ skill, level, dependency }) => {
  let infoJSX = [];
  let special, specialName = "";
  if (level !== 0 && typeof skill !== "undefined") {
    for (let inf in skill) {
      specialName = inf;
      const isDamage = specialName.includes("Damage") ? true : false;
      if (typeof skill[inf] === "function" && isDamage) {
        let damage = skill[inf](level, dependency);
        if (typeof damage === 'object' && !_.isEmpty(damage)) {
          infoJSX.push(
             <DamageInfo
                key={specialName+level}
                damage={damage}
                label={specialName}
             />
           );
         }
         // in case the function doesn't return a damage object, fe: Fire Mastery
        if (typeof damage !== 'object') {
           special = skill[inf](level, dependency);
           infoJSX.push(<p key={specialName+level}>{`${specialName}: ${special}`}</p>)
         }
      }
      else if (typeof skill[inf] === "function") {
        special = skill[inf](level, dependency);
        infoJSX.push(<p key={specialName+level}>{`${specialName}: ${special}`}</p>)
      }
    }
  }

  return (
    <div>
      { infoJSX.length > 0 && infoJSX }
    </div>
  );
};

export default SkillInfo;
