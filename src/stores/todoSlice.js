import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const todoSlice = createSlice({
    name: "todos",
    initialState: { todos: [] },
    reducers: {
        ekle: (state, action) => {
            if (action.payload !== "") {
                state.todos = [{ id: nanoid(), gorev: action.payload, durum: false }, ...state.todos];
            }
        },
        sil: (state, action) => {
            state.todos = state.todos.filter(t => t.id !== action.payload);
        },
        degistir: (state, action) => {
            state.todos = state.todos.map(item => item.id === action.payload ? { ...item, durum: !item.durum } : item);
        }
    }
});

export const { ekle, sil, degistir } = todoSlice.actions
export default todoSlice.reducer