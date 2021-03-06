import {
  State,
  SceneActions,
  SET_INTERACTION_MODE,
  SET_MOUSE_POSITION,
  SET_CURRENT_Y,
  SET_CURRENT_X,
} from './types';

const initialState: State = {
  interactionMode: false,
  mousePosition: { x: 0, y: 0 },
  currentX: '',
  currentY: '',
};

export const sceneReducer = (
  state = initialState,
  action: SceneActions
): State => {
  switch (action.type) {
    case SET_INTERACTION_MODE:
      return {
        ...state,
        interactionMode: action.payload,
      };
    case SET_MOUSE_POSITION:
      return {
        ...state,
        mousePosition: action.payload,
      };
    case SET_CURRENT_X:
      return {
        ...state,
        currentX: action.payload,
      };
    case SET_CURRENT_Y:
      return {
        ...state,
        currentY: action.payload,
      };
    default:
      return state;
  }
};
