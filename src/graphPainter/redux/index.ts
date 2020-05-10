import { combineReducers, createStore } from 'redux';
import { sceneReducer } from './scene/reducers';

const rootReducer = combineReducers({
  scene: sceneReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(
  rootReducer,
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export * from './scene/actions';
export * from './selectors';
