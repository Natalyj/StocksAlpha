import { AXIS_PICKING_ZONE, GRAPH_PADDING } from '../constants';
import { Point2D, RectangleCoords, AxisCoords } from '../types';
import { roundFast } from '../utils';

export const addControlLine = (
  context2d: CanvasRenderingContext2D,
  axisCoords: AxisCoords,
  dataCoordinates: Map<number, number>
): void => {
  const { canvas } = context2d;
  const { axesBegin, xAxesEnd, yAxesEnd } = axisCoords;

  const graphBoundingRect: RectangleCoords = {
    lowLeftCoords: {
      x: axesBegin.x + GRAPH_PADDING,
      y: axesBegin.y,
    },
    highRightCoords: {
      x: xAxesEnd.x - GRAPH_PADDING,
      y: yAxesEnd.y,
    },
  };

  canvas.onmousemove = (event: MouseEvent): void => {
    const { x, y } = event;
    if (isBetweenExtendedZone({ x, y }, graphBoundingRect)) {
      const roundedX = roundFast(x);

      context2d.clearRect(0, 0, canvas.width, canvas.height);
      context2d.beginPath();

      drawControlPoint(context2d, roundedX);
      context2d.moveTo(roundedX, axesBegin.y);
      context2d.lineTo(roundedX, yAxesEnd.y);

      context2d.stroke();
    }
  };
};

const isBetweenExtendedZone = (
  point: Point2D,
  rect: RectangleCoords
): boolean => {
  const { lowLeftCoords, highRightCoords } = rect;

  const isBetweenX = point.x >= lowLeftCoords.x && point.x <= highRightCoords.x;
  const isBetweenY =
    point.y <= lowLeftCoords.y + AXIS_PICKING_ZONE &&
    point.y >= highRightCoords.y;

  return isBetweenX && isBetweenY;
};

const drawControlPoint = (
  context2d: CanvasRenderingContext2D,
  x: number
): void => {
  const y = 10;
  const radius = 2;
  const startAngle = 0;
  const endAngle = 2 * Math.PI;

  context2d.beginPath();
  context2d.arc(x, y, radius, startAngle, endAngle);
  context2d.fill();
};
