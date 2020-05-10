import { Point2D } from '../../types';

export const SET_INTERACTION_MODE = 'SCENE/SET_INTERACTION_MODE';
export const SET_MOUSE_POSITION = 'SCENE/SET_MOUSE_POSITION';
export const SET_CURRENT_Y = 'SCENE/SET_CURRENT_Y';

interface SetInteractionModeAction {
  type: typeof SET_INTERACTION_MODE;
  payload: boolean;
}

interface SetMousePositionAction {
  type: typeof SET_MOUSE_POSITION;
  payload: Point2D;
}

interface SetCurrentYAction {
  type: typeof SET_CURRENT_Y;
  payload: number;
}

export type SceneActions =
  | SetInteractionModeAction
  | SetMousePositionAction
  | SetCurrentYAction;

export interface State {
  interactionMode: boolean;
  mousePosition: Point2D;
  currentY: number;
}
