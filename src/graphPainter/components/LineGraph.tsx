import React, { useEffect } from 'react';
import {
  getContext2d,
  computeAxisCoords,
  getDataCoordinates,
  getActionsCallbacks,
  getStaticCanvasId,
  getDynamicCanvasId,
} from '../utils';
import { drawAxes, drawGraph, addControlLine } from '../draw';
import { YValueLabel } from './labels/YValueLabel';
import { Provider } from 'react-redux';
import { store } from '../redux';
import { XValueLabel } from './labels/XValueLabel';

interface Props {
  id: string;
  width: number;
  height: number;
  dataToDraw: Array<any>;
}

const Graph: React.FC<Props> = ({ id, width, height, dataToDraw }: Props) => {
  const idStatic = getStaticCanvasId(id);
  const idDynamic = getDynamicCanvasId(id);
  const actions = getActionsCallbacks();

  useEffect(() => {
    const context2dStatic = getContext2d(idStatic);
    const context2dDynamic = getContext2d(idDynamic);

    const axisCoords = computeAxisCoords(context2dStatic);
    const dataCoordinates = getDataCoordinates(dataToDraw, context2dStatic);

    drawAxes(context2dStatic, axisCoords);
    drawGraph(context2dStatic, dataCoordinates);

    addControlLine(context2dDynamic, axisCoords, dataCoordinates, actions);
  });

  return (
    <>
      <canvas
        id={idStatic}
        width={width}
        height={height}
        style={{ zIndex: 1, position: 'absolute' }}
      />
      <canvas
        id={idDynamic}
        width={width}
        height={height}
        style={{ zIndex: 2, position: 'absolute' }}
      />
      <XValueLabel canvasHeight={height} />
      <YValueLabel canvasHeight={height} />
    </>
  );
};

export const LineGraph: React.FC<Props> = (props: Props) => (
  <Provider store={store}>
    <Graph {...props} />
  </Provider>
);
