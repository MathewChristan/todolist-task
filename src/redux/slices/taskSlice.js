import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks") ?? "[]"),
  taskForm: {},
};

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskForm: (state, { payload: { key, value } }) => {
      state.taskForm[key] = value;
    },
    updateTasksByUserId: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.userID === payload);
    },
    addNewTask: (state, { payload }) => {
      if (payload.id) {
        state.tasks = state.tasks.map((task) => {
          if (task.id === payload.id) return payload;
          return task;
        });
      } else {
        payload["id"] = makeid(6);
        state.tasks.push(payload);
      }
    },
    resetTaskForm: (state) => {
      state.taskForm = {};
    },
    updateTaskForm: (state, { payload }) => {
      state.taskForm = payload;
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((tsk) => tsk.id !== payload);
    },

    updateTaskStatus: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload) {
          task.status =
            task.status === "completed" ? "incomplete" : "completed";
        }
        return task;
      });
    },
    resetTasks: (state) => {
      state.tasks = [];
    }
  },
});

export const {
  taskForm,
  addNewTask,
  resetTaskForm,
  updateTaskForm,
  updateTaskStatus,
  deleteTask,
  updateTasksByUserId,
  resetTasks
} = taskSlice.actions;
export default taskSlice.reducer;
