import React from 'react';

const Score = ({ id, value = 0, style }) => {
  return (
    <input type="text" id={id} name={id} readOnly value={value} style={style} />
  )
}

export default Score;
