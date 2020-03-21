import { AxisCoords } from './types';
import { AXIS_PADDING } from './constants';

export const getContext2d = (canvasId: string): CanvasRenderingContext2D => {
  const canvas = document.getElementById(canvasId);

  if (canvas instanceof HTMLCanvasElement) {
    const context2d = canvas.getContext('2d');
    if (context2d !== null) {
      return context2d;
    }
  }

  throw new Error(`No context for ${canvasId} canvas`);
};

export const computeAxisCoords = (
  context2d: CanvasRenderingContext2D
): AxisCoords => {
  const { canvas } = context2d;
  const { width, height } = canvas;

  const widthPadding = width - AXIS_PADDING;
  const heightPadding = height - AXIS_PADDING;

  return {
    axesBegin: { x: AXIS_PADDING, y: heightPadding },
    xAxesEnd: { x: widthPadding, y: heightPadding },
    yAxesEnd: { x: AXIS_PADDING, y: AXIS_PADDING },
  };
};
