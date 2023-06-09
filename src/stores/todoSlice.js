import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const todoItems = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

export const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: todoItems },
  reducers: {
    ekle: (state, action) => {
      if (action.payload !== "") {
        state.todos = [
          { id: nanoid(), gorev: action.payload, durum: false },
          ...state.todos,
        ];
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    sil: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    degistir: (state, action) => {
      state.todos = state.todos.map((item) =>
        item.id === action.payload ? { ...item, durum: !item.durum } : item
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { ekle, sil, degistir } = todoSlice.actions;
export default todoSlice.reducer;
