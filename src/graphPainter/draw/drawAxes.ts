import { AXIS_PADDING, ARROW_LENGTH } from '../constants';
import { Point2D } from '../types';

export const drawAxes = (context2d: CanvasRenderingContext2D): void => {
  const {
    canvas: { width, height },
  } = context2d;

  const widthPadding = width - AXIS_PADDING;
  const heightPadding = height - AXIS_PADDING;

  // X axis
  drawArrow(
    context2d,
    { x: AXIS_PADDING, y: heightPadding },
    { x: widthPadding, y: heightPadding }
  );

  // Y axis
  drawArrow(
    context2d,
    { x: AXIS_PADDING, y: heightPadding },
    { x: AXIS_PADDING, y: AXIS_PADDING }
  );
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
