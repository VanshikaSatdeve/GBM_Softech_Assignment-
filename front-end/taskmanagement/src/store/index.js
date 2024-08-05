
import { configureStore } from '@reduxjs/toolkit';
import TaskListSliceReducer from '../componants/tasks/TaskListSliceReducer';


export default function createStore(preloadedState = {}) {
  const store = configureStore(
    {
      reducer: {
        task: TaskListSliceReducer
      },
      preloadedState,
    }
  );

  return store;
};


