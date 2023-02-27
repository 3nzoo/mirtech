import React, { useState } from 'react';
import './toggleSwitch.css';

type Props = {
  checked: boolean;
  onChange: (arg: boolean) => void;
};

const ToggleSwitch = (props: Props) => {
  const [checked, setChecked] = useState(props.checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setChecked(!checked);
    if (props.onChange) {
      props.onChange(!checked);
    }
  };
  return (
    <label className='switch'>
      <input type='checkbox' checked={checked} onChange={handleChange} />
      <span className='slider round'></span>
    </label>
  );
};

export default ToggleSwitch;
