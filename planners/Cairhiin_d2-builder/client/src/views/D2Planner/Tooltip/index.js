import React from 'react';
import PropTypes from 'prop-types';
import Description from './Description';
import Header from './Header';
import SkillInfo from './SkillInfo';
import './index.css';

const Tooltip = ({ skill, style, level, dependency }) => {
  const data = skill[0].data;
  let { name, description, dependencies } = skill[0];
  if (typeof dependencies === 'undefined') dependencies = [];
  let DEPENDENCIES_JSX = [];

  for (let d in dependencies) {
    let hasName = dependencies[d].hasOwnProperty("name");
    let hasDescription = dependencies[d].hasOwnProperty("description");
    if (hasDescription && hasName) {
      let text = dependencies[d].description.replace("{V}", dependencies[d].value);
      DEPENDENCIES_JSX.push(<p key={dependencies[d].name+text}>{`${dependencies[d].name}: ${text}`}</p>);
    }
    if (!hasDescription && hasName) {
      DEPENDENCIES_JSX.push(<p key={dependencies[d].name}>{dependencies[d].name}</p>);
    }
  }

  return (
    <div id="tooltip" style={style}>
      <Header info={name} />
      <Description info={description} />
      { level > 0 &&
        <div className="skill-block">
          <p>{`Current Skill level: ${level}`}</p>
          <SkillInfo
            skill={data}
            level={level}
            dependency={dependency}
          />
        </div>
      }
      <div className="skill-block next-level">
        <p>{`Next Skill level: ${level + 1}`}</p>
        <SkillInfo
          skill={data}
          level={level+1}
          dependency={dependency}
        />
      </div>
      { dependencies.length > 0 && (
          <>
            <h4>{ name } Receives Bonuses From:</h4>
            <div>{ DEPENDENCIES_JSX }</div>
          </>
        )
      }
    </div>
  )
}

Tooltip.propTypes = {
  skill: PropTypes.array
};

export default Tooltip;
