import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  getMousePosition,
  isInteractionMode,
  getCurrentX,
} from '../../redux/selectors';
import { FloatingLabel } from './FloatingLabel';
import { X_LABEL_VERTICAL_OFFSET, LABEL_MOUSE_OFFSET } from '../../constants';

interface Props {
  canvasHeight: number;
}

export const XValueLabel: React.FC<Props> = ({ canvasHeight }: Props) => {
  const interactionMode = useSelector(isInteractionMode);
  const value = useSelector(getCurrentX);

  const { x: mouseX } = useSelector(getMousePosition);
  const x = useMemo(() => mouseX + LABEL_MOUSE_OFFSET, [mouseX]);
  const y = useMemo(
    () => canvasHeight + LABEL_MOUSE_OFFSET - X_LABEL_VERTICAL_OFFSET,
    [canvasHeight]
  );

  return (
    <FloatingLabel
      isLabelVisible={interactionMode}
      position={{ x, y }}
      text={value}
    />
  );
};
