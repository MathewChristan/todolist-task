import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import TodoTask from "../Components/TodoTask";
import TaskModal from "../Components/Modals/TaskModal";
import {
  addNewTask,
  resetTaskForm,
  updateTaskForm,
  updateTasksByUserId,
} from "../redux/slices/taskSlice";

const Home = () => {
  const { tasks = [], taskForm: taskFormData } = useSelector(
    (state) => state.task
  );

  const [search, setSearch] = useState("");

  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    let payload = { ...taskFormData };
    payload["userID"] = userDetails.userID;
    payload["status"] = "incomplete";
    dispatch(addNewTask(payload));
    setOpen(false);
  };

  const onEdit = (id) => {
    let task = tasks.find((ts) => ts.id === id);
    dispatch(updateTaskForm(task));
    setOpen(true);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!userDetails.userID) navigate("/");
    else dispatch(updateTasksByUserId(userDetails.userID));
  }, []);

  useEffect(() => {
    if (!open) dispatch(resetTaskForm());
  }, [open]);

  return (
    <div>
      <Header />

      <div className="h-full home-main overflow-auto">
        <div className="flex justify-end mx-20 mt-10">
          <button
            onClick={() => setOpen(true)}
            className="border border-blue-500  text-blue-500 rounded-md px-3 py-2 hover:bg-blue-500 hover:text-white"
          >
            Add Task
          </button>

          <button
            onClick={() => navigate('/setting')}
            className="ml-3 border border-green-600  text-green-600 rounded-md px-3 py-2 hover:bg-green-600 hover:text-white"
          >
            Settings
          </button>
        </div>
        {tasks &&
          (tasks.length < 1 ? (
            <div className="text-center mt-32 text-lg text-green-700">
              No task left !
            </div>
          ) : (
            <div className="mx-20 mt-10">
              <p>Search Task</p>
              <Input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Task"
              />
              {tasks.map((task, index) => {
                if (search && !task.title.toLocaleLowerCase().includes(search))
                  return null;
                return (
                  <TodoTask
                    key={`task-key-${index}`}
                    {...task}
                    onEdit={onEdit}
                  />
                );
              })}
            </div>
          ))}
      </div>
      <TaskModal open={open} setOpen={setOpen} onSubmit={onSubmit} />
    </div>
  );
};

export default Home;
