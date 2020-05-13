import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import { getRootElement } from '../../utils';
import { Point2D } from '../../types';

interface Props {
  isLabelVisible: boolean;
  position: Point2D;
  text: string;
}

export const FloatingLabel: React.FC<Props> = ({
  isLabelVisible,
  position,
  text,
}: Props) => {
  const root = useMemo(() => getRootElement(), []);

  const { x, y } = position;
  const label = (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        backgroundColor: 'white',
        border: '1px solid black',
        zIndex: 1,
      }}
    >
      {text}
    </div>
  );

  return isLabelVisible ? ReactDOM.createPortal(label, root) : <></>;
};
