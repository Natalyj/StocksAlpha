import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  getMousePosition,
  isInteractionMode,
  getCurrentY,
} from '../../redux/selectors';
import { FloatingLabel } from './FloatingLabel';
import { LABEL_MOUSE_OFFSET, Y_LABEL_VERTICAL_BOUND } from '../../constants';

interface Props {
  canvasHeight: number;
}

export const YValueLabel: React.FC<Props> = ({ canvasHeight }: Props) => {
  const interactionMode = useSelector(isInteractionMode);
  const value = useSelector(getCurrentY);

  const { x: mouseX, y: mouseY } = useSelector(getMousePosition);
  const x = useMemo(() => mouseX + LABEL_MOUSE_OFFSET, [mouseX]);
  const y = getY(canvasHeight, mouseY);

  return (
    <FloatingLabel
      isLabelVisible={interactionMode}
      position={{ x, y }}
      text={value}
    />
  );
};

const getY = (canvasHeight: number, mouseY: number): number => {
  const yVerticalOffset = useMemo(() => canvasHeight - Y_LABEL_VERTICAL_BOUND, [
    canvasHeight,
  ]);

  let y = useMemo(() => mouseY + LABEL_MOUSE_OFFSET, [mouseY]);
  if (y >= yVerticalOffset) {
    y = yVerticalOffset;
  }

  return y;
};
