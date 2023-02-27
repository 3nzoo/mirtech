import React, { useState } from 'react';
import './Toast.css';

type ToastProps = {
  message: string;
  type: 'error' | 'success';
};

const Toast = ({ message, type }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className={`toast ${type}`} onClick={handleClose}>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Toast;
