import { AxisCoords, GraphCoordinates, Point2D, Actions } from './types';
import { AXIS_PADDING, GRAPH_PADDING } from './constants';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  setMousePosition,
  setInteractionMode,
  setCurrentY,
  setCurrentX,
} from './redux';

export const getStaticCanvasId = (id: string): string => `${id}-static`;
export const getDynamicCanvasId = (id: string): string => `${id}-dynamic`;

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

export const getRootElement = (): HTMLElement => {
  const root = document.getElementById('root');

  if (root === null) {
    throw new Error('No root element found');
  }

  return root;
};

export const computeAxisCoords = (
  context2d: CanvasRenderingContext2D
): AxisCoords => {
  const { canvas } = context2d;
  const { width, height } = canvas;

  const widthPadding = roundFast(width - AXIS_PADDING);
  const heightPadding = roundFast(height - AXIS_PADDING);

  return {
    axesBegin: { x: AXIS_PADDING, y: heightPadding },
    xAxesEnd: { x: widthPadding, y: heightPadding },
    yAxesEnd: { x: AXIS_PADDING, y: AXIS_PADDING },
  };
};

export const roundFast = (value: number): number => (0.5 + value) << 0;

export const roundToDecimals = (
  value: number,
  decimalPlaces: number
): number => {
  const tensAmount = Math.pow(10, decimalPlaces);
  return Math.round((value + Number.EPSILON) * tensAmount) / tensAmount;
};

export const getDataCoordinates = (
  dataToDraw: Array<any>,
  context2d: CanvasRenderingContext2D
): GraphCoordinates => {
  const numberOfPoints = dataToDraw.length;
  const keys = Object.keys(dataToDraw[0]);

  if (numberOfPoints === 0 || keys.length !== 2) {
    return {
      initialX: 0,
      xStep: 0,
      xValues: [],
      yValues: [],
      yCoordinates: [],
    };
  }

  const {
    canvas: { width, height },
  } = context2d;

  // for faster calculations get characteristics in one run
  const { values: yValues, min: yMin, max: yMax } = getDataCharacteristics(
    dataToDraw,
    keys[1]
  );

  const getVariationFromYMax = (currentValue: number): number =>
    yMax - currentValue + 1;

  const bothSidesPadding = (GRAPH_PADDING + AXIS_PADDING) * 2;
  const xGapBetweenPoints = (width - bothSidesPadding) / (numberOfPoints - 1);
  const yGapBetweenPoints =
    (height - bothSidesPadding) / getVariationFromYMax(yMin);
  const graphEdgesPadding = GRAPH_PADDING + AXIS_PADDING;
  const getGraphRelatedY = (currentY: number): number =>
    roundFast(
      graphEdgesPadding + getVariationFromYMax(currentY) * yGapBetweenPoints
    );

  return {
    initialX: graphEdgesPadding,
    xStep: xGapBetweenPoints,
    xValues: dataToDraw.map(data => data[keys[0]]),
    yValues: yValues.map(yValue => roundToDecimals(yValue, 2)),
    yCoordinates: yValues.map(yValue => getGraphRelatedY(yValue)),
  };
};

const getDataCharacteristics = (
  dataToDraw: Array<any>,
  key: string
): { values: number[]; min: number; max: number } => {
  const values: number[] = [];
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  dataToDraw.forEach(data => {
    const value = Number(data[key]);
    values.push(value);

    if (value < min) {
      min = value;
    }

    if (value > max) {
      max = value;
    }
  });

  return { values, min, max };
};

export const getActionsCallbacks = (): Actions => {
  const dispatch = useDispatch();

  return {
    setMousePosition: useCallback(
      (mousePosition: Point2D) => dispatch(setMousePosition(mousePosition)),
      [dispatch]
    ),
    setInteractionMode: useCallback(
      (interactionMode: boolean) =>
        dispatch(setInteractionMode(interactionMode)),
      [dispatch]
    ),
    setCurrentX: useCallback(
      (currentX: string) => dispatch(setCurrentX(currentX)),
      [dispatch]
    ),
    setCurrentY: useCallback(
      (currentY: string) => dispatch(setCurrentY(currentY)),
      [dispatch]
    ),
  };
};
