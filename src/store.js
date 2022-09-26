import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './stores/todoSlice'

export const store = configureStore({
    reducer: {
        todos: todoReducer
    }
})