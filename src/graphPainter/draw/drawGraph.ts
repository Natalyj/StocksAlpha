import { GraphCoordinates } from '../types';
import { roundFast } from '../utils';

export const drawGraph = (
  context2d: CanvasRenderingContext2D,
  dataCoordinates: GraphCoordinates
): void => {
  const { initialX, xStep, yCoordinates } = dataCoordinates;

  if (yCoordinates.length === 0) {
    return;
  }

  let currentX = initialX;

  context2d.beginPath();

  context2d.moveTo(currentX, yCoordinates[0]);
  for (let i = 1; i < yCoordinates.length; i++) {
    currentX += xStep;
    context2d.lineTo(roundFast(currentX), yCoordinates[i]);
  }

  context2d.stroke();
};
