import { RootState } from './index';
import { Point2D } from '../types';

export const isInteractionMode = (state: RootState): boolean =>
  state.scene.interactionMode;

export const getMousePosition = (state: RootState): Point2D =>
  state.scene.mousePosition;

export const getCurrentY = (state: RootState): number => state.scene.currentY;
