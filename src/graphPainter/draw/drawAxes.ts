import { ARROW_LENGTH } from '../constants';
import { Point2D, AxisCoords } from '../types';

export const drawAxes = (
  context2d: CanvasRenderingContext2D,
  axisCoords: AxisCoords
): void => {
  const { axesBegin, xAxesEnd, yAxesEnd } = axisCoords;

  // X axis
  drawArrow(context2d, axesBegin, xAxesEnd);

  // Y axis
  drawArrow(context2d, axesBegin, yAxesEnd);
};

const drawArrow = (
  context2d: CanvasRenderingContext2D,
  from: Point2D,
  to: Point2D
): void => {
  const arrowInclination = Math.PI / 6;
  const lengthX = to.x - from.x;
  const lengthY = to.y - from.y;
  const angle = Math.atan2(lengthY, lengthX);
  const negativeInclination = angle - arrowInclination;
  const positiveInclination = angle + arrowInclination;

  context2d.beginPath();

  context2d.moveTo(from.x, from.y);
  context2d.lineTo(to.x, to.y);
  context2d.lineTo(
    to.x - ARROW_LENGTH * Math.cos(negativeInclination),
    to.y - ARROW_LENGTH * Math.sin(negativeInclination)
  );
  context2d.moveTo(to.x, to.y);
  context2d.lineTo(
    to.x - ARROW_LENGTH * Math.cos(positiveInclination),
    to.y - ARROW_LENGTH * Math.sin(positiveInclination)
  );

  context2d.stroke();
};
