import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

import { getMousePosition, isInteractionMode, getCurrentY } from './redux';
import { getRootElement } from './utils';

export const ValueLabel: React.FC = () => {
  const root = getRootElement();

  const position = useSelector(getMousePosition);
  const interactionMode = useSelector(isInteractionMode);
  const value = useSelector(getCurrentY);

  const { x, y } = position;
  const label = (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        border: '1px solid black',
        zIndex: 100,
      }}
    >
      {value}
    </div>
  );

  return interactionMode ? ReactDOM.createPortal(label, root) : <></>;
};
