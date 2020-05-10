export interface Point2D {
  x: number;
  y: number;
}

export interface RectangleCoords {
  lowLeftCoords: Point2D;
  highRightCoords: Point2D;
}

export interface AxisCoords {
  axesBegin: Point2D;
  xAxesEnd: Point2D;
  yAxesEnd: Point2D;
}

export interface GraphCoordinates {
  initialX: number;
  xStep: number;
  yCoordinates: number[];
}

export interface Actions {
  setMousePosition: (mousePosition: Point2D) => void;
  setInteractionMode: (interactionMode: boolean) => void;
  setCurrentY: (currentY: number) => void;
}
