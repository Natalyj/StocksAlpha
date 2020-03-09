import React, { useEffect } from 'react';
import { getContext2d } from './utils';
import { drawAxis, drawGraph } from './draw';

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
    drawAxis(context2d);
    drawGraph(context2d, dataToDraw);
  });

  return <canvas id={id} width={width} height={height} />;
};
