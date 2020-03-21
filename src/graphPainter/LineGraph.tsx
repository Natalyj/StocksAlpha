import React, { useEffect } from 'react';
import { getContext2d, computeAxisCoords } from './utils';
import { drawAxes, drawGraph, addControlLine } from './draw';

interface Props {
  id: string;
  width: number;
  height: number;
  dataToDraw: Array<any>;
}

export const LineGraph: React.FC<Props> = ({
  id,
  width,
  height,
  dataToDraw,
}: Props) => {
  useEffect(() => {
    const context2d = getContext2d(id);
    const axisCoords = computeAxisCoords(context2d);

    const redrawLineGraph = (): void => {
      const { canvas } = context2d;
      context2d.clearRect(0, 0, canvas.width, canvas.height);
      drawAxes(context2d, axisCoords);
      drawGraph(context2d, dataToDraw);
    };

    redrawLineGraph();
    addControlLine(context2d, axisCoords, redrawLineGraph);
  });

  return <canvas id={id} width={width} height={height} />;
};
