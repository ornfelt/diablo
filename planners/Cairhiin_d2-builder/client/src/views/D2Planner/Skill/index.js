import React from 'react';

const Skill = ({
  coords,
  alt,
  id,
  onClick,
  handleMouseEnter,
  handleMouseLeave
}) => {
  return (
      <area
        shape="rect"
        coords={coords}
        alt={alt}
        id={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
  )
}

export default Skill;
