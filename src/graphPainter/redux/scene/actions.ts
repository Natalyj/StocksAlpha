import {
  SceneActions,
  SET_INTERACTION_MODE,
  SET_MOUSE_POSITION,
  SET_CURRENT_Y,
} from './types';
import { Point2D } from '../../types';

export const setInteractionMode = (interactionMode: boolean): SceneActions => ({
  type: SET_INTERACTION_MODE,
  payload: interactionMode,
});

export const setMousePosition = (mousePosition: Point2D): SceneActions => ({
  type: SET_MOUSE_POSITION,
  payload: mousePosition,
});

export const setCurrentY = (currentY: number): SceneActions => ({
  type: SET_CURRENT_Y,
  payload: currentY,
});
