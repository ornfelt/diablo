import React from 'react';

const isMinMaxEqual = (min, max) => min === max;

const DamageInfo = ({ label, damage }) => {
  const min = Math.round(damage["min"]);
  const max = Math.round(damage["max"]);
  return (
    <p>
      { label }: { isMinMaxEqual(min, max) ? ` ${min}` : ` ${min}-${max}` }
    </p>
  );
};

export default DamageInfo;
