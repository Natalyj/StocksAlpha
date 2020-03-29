import React, { useEffect } from 'react';
import { getContext2d, computeAxisCoords, getDataCoordinates } from './utils';
import { drawAxes, drawGraph, addControlLine } from './draw';

interface Props {
  id: string;
  width: number;
  height: number;
  dataToDraw: Array<any>;
}

const getStaticCanvasId = (id: string): string => `${id}-static`;
const getDynamicCanvasId = (id: string): string => `${id}-dynamic`;

export const LineGraph: React.FC<Props> = ({
  id,
  width,
  height,
  dataToDraw,
}: Props) => {
  const idStatic = getStaticCanvasId(id);
  const idDynamic = getDynamicCanvasId(id);

  useEffect(() => {
    const context2dStatic = getContext2d(idStatic);
    const context2dDynamic = getContext2d(idDynamic);

    const axisCoords = computeAxisCoords(context2dStatic);
    const dataCoordinates = getDataCoordinates(dataToDraw, context2dStatic);

    drawAxes(context2dStatic, axisCoords);
    drawGraph(context2dStatic, dataCoordinates);

    addControlLine(context2dDynamic, axisCoords, dataCoordinates);
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
    </>
  );
};
