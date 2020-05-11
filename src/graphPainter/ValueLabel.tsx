import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

import {
  getMousePosition,
  isInteractionMode,
  getCurrentY,
} from './redux/selectors';
import { getRootElement } from './utils';
import { LABEL_OFFSET } from './constants';

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
        top: y + LABEL_OFFSET,
        left: x + LABEL_OFFSET,
        backgroundColor: 'white',
        border: '1px solid black',
        zIndex: 1,
      }}
    >
      {value}
    </div>
  );

  return interactionMode ? ReactDOM.createPortal(label, root) : <></>;
};
