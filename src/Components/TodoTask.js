import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTaskStatus } from "../redux/slices/taskSlice";

const TodoTask = ({
  title,
  description,
  status,
  userID,
  id,
  onEdit = () => {},
}) => {
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (userDetails.userID !== userID) return null;
  return (
    <div className="border border-slate-300 mt-2 p-4 rounded-md relative">
      <div className="mt-5">
        <p className="text-base font-medium">{title}</p>
        <p>{description}</p>
      </div>
      <div>
        {status === "completed" ? (
          <p className="text-green-600 uppercase font-semibold absolute top-2 right-2">
            Completed
          </p>
        ) : (
          <p className="absolute top-2 right-2 text-sm uppercase font-semibold text-red-700">
            PENDING
          </p>
        )}
        <div className="mt-4">
          <Button type="default" className="mr-2" onClick={() => onEdit(id)}>
            Edit
          </Button>

          <Button
            type="primary"
            className="mr-2 mt-2"
            onClick={() => dispatch(updateTaskStatus(id))}
          >
            Mark As {status === "completed" ? "In Complete" : "Complete"}
          </Button>

          <Button
            type="default mt-2"
            danger
            onClick={() => dispatch(deleteTask(id))}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoTask;
