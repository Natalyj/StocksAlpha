import { Point2D } from '../../types';

export const SET_INTERACTION_MODE = 'SCENE/SET_INTERACTION_MODE';
export const SET_MOUSE_POSITION = 'SCENE/SET_MOUSE_POSITION';
export const SET_CURRENT_Y = 'SCENE/SET_CURRENT_Y';
export const SET_CURRENT_X = 'SCENE/SET_CURRENT_X';

interface SetInteractionModeAction {
  type: typeof SET_INTERACTION_MODE;
  payload: boolean;
}

interface SetMousePositionAction {
  type: typeof SET_MOUSE_POSITION;
  payload: Point2D;
}

interface SetCurrentXAction {
  type: typeof SET_CURRENT_X;
  payload: string;
}

interface SetCurrentYAction {
  type: typeof SET_CURRENT_Y;
  payload: string;
}

export type SceneActions =
  | SetInteractionModeAction
  | SetMousePositionAction
  | SetCurrentXAction
  | SetCurrentYAction;

export interface State {
  interactionMode: boolean;
  mousePosition: Point2D;
  currentX: string;
  currentY: string;
}
