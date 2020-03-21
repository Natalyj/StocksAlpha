import { AXIS_PICKING_ZONE, GRAPH_PADDING } from '../constants';
import { Point2D, RectangleCoords, AxisCoords } from '../types';

export const addControlLine = (
  context2d: CanvasRenderingContext2D,
  axisCoords: AxisCoords,
  redrawCanvas: () => void
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
      redrawCanvas();

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
