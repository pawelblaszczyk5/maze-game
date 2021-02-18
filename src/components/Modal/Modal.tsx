import {ReactNode} from 'react';
import './Modal.css';

export const Modal = ({children}: { children: ReactNode }) => {

  return (
    <div className="Modal">
      <div className="Modal__body">
        {children}
      </div>
    </div>
  );
};
