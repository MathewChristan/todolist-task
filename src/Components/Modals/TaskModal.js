import { Button, Checkbox, Form, Input, Modal } from "antd";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskForm } from "../../redux/slices/taskSlice";

const TaskModal = ({ open, setOpen, onSubmit = () => {} }) => {
  const { taskForm: taskFormData } = useSelector((state) => state.task);
  const [error, setError] = useState({
    title: "",
    desc: "",
  });

  const dispatch = useDispatch();

  const onChange = (value = "", key) => dispatch(taskForm({ key, value }));
  const onOk = () => {
    if (!taskFormData.title)
      setError((error) => ({ ...error, title: "Title is required" }));
    if (!taskFormData.description)
      setError((error) => ({ ...error, desc: "Description is required" }));
    if (!taskFormData.description || !taskFormData.title) return null;
    onSubmit();
  };

  return (
    <>
      <Modal
        title={`${taskFormData.id ? "Update" : "Add"} Task`}
        centered
        destroyOnClose
        open={open}
        okText={`${taskFormData.id ? "Update" : "Add"} Task`}
        onOk={onOk}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <div>
          <p>Task Title</p>
          <input
            onChange={(e) => onChange(e.target.value, "title")}
            type="text"
            value={taskFormData.title}
            placeholder="Task title"
            className="w-full px-3 py-1 outline-none border border-slate-300 rounded-sm"
          />
          {!taskFormData.title && <p className="text-red-700">{error.title}</p>}
        </div>

        <div className="mt-5">
          <p>Task Description</p>
          <textarea
            rows={7}
            onChange={(e) => onChange(e.target.value, "description")}
            value={taskFormData.description}
            type="text"
            placeholder="Write description"
            className="w-full px-3 py-2 outline-none border border-slate-300 rounded-sm"
          />
          {!taskFormData.description && (
            <p className="text-red-700">{error.desc}</p>
          )}
        </div>
      </Modal>
    </>
  );
};
export default TaskModal;
