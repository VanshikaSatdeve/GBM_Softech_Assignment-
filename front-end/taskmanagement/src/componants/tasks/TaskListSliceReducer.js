import { createSlice } from "@reduxjs/toolkit";

const taskSliceReducer = createSlice({
    name: 'task',
    initialState: {
        allTasks: [],
        error: null
    },
    reducers: {
        GET_TASK: (state, action) => {
            console.log("inside holiday reducer:");
            state.task = {};
            state.allTasks = action.payload;
        },
        GET_TASK_ERROR: (state, action) => {
            state.task = {};
            state.error = action.payload;
        },
        ADD_TASK: (state, action) => {
            state.allTasks.push(action.payload);
            state.task = {};
        },
        UPDATE_TASK: (state, action) => {
            const index = state.allTasks.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
                state.allTasks[index] = action.payload;
            }
        },
        DELETE_TASK: (state, action) => {
            state.allTasks = state.allTasks.filter(d => d.id !== action.payload);
        },
    }
});

export const taskActions = taskSliceReducer.actions;
export default taskSliceReducer.reducer;