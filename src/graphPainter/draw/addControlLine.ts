import { AXIS_PICKING_ZONE, GRAPH_PADDING } from '../constants';
import { Point2D, RectangleCoords } from '../types';

export const addControlLine = (
  context2d: CanvasRenderingContext2D,
  axesBegin: Point2D,
  xAxesEnd: Point2D,
  yAxesEnd: Point2D
): void => {
  const { canvas } = context2d;
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
      // temp solution: just draw a line
      context2d.beginPath();

      context2d.moveTo(x, axesBegin.y);
      context2d.lineTo(x, yAxesEnd.y);

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
