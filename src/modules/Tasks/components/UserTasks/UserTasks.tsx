import React, { useEffect, useState } from "react";
import "./UserTasks.scss";
import axios, { AxiosError } from "axios";
import { TASKS_URLS } from "../../../../constants/END_POINTS";
import { BASE_HEADERS } from "./../../../../constants/END_POINTS";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done";
}

interface TasksResponse {
  data: Task[];
}

interface ErrorResponse {
  message: string;
}

export default function UserTasks() {
  const [Tasks, setTasks] = useState<Task[]>([]);

  const getAllTasks = async () => {
    try {
      const response = await axios.get<TasksResponse>(
        TASKS_URLS.getAllAssignedTasks,
        {
          params: {
            pageSize: 1000,
            pageNumber: 1,
          },
          ...BASE_HEADERS,
        }
      );
      setTasks(response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(axiosError.response?.data.message);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="wrapper">
      <div>
        <h2>Tasks Board</h2>
      </div>
      <div className="taskBoard">
        <Column
          title="ToDo"
          tasks={Tasks.filter((task) => task.status === "ToDo")}
          getAllTasks={getAllTasks}
        />
        <Column
          title="InProgress"
          tasks={Tasks.filter((task) => task.status === "InProgress")}
          getAllTasks={getAllTasks}
        />
        <Column
          title="Done"
          tasks={Tasks.filter((task) => task.status === "Done")}
          getAllTasks={getAllTasks}
        />
      </div>
    </div>
  );
}

const Column = ({
  title,
  tasks,
  getAllTasks,
}: {
  title: string;
  tasks: Task[];
  getAllTasks: () => void;
}) => {
  const [dragging, setDragging] = useState(false);

  const updateTaskStatus = async ({
    id,
    status,
  }: {
    id: number;
    status: Task["status"];
  }) => {
    try {
      await axios.put(TASKS_URLS.changeStatus(id), { status }, BASE_HEADERS);
      getAllTasks();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(axiosError.response?.data.message);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const taskId = e.dataTransfer.getData("taskId");
    const status = title as Task["status"];
    updateTaskStatus({ id: parseInt(taskId, 10), status });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className="column">
      <h3>{title}</h3>
      <div
        className={`cards ${dragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {tasks.map(({ title, id }, index) => (
          <div
            className={`card ${dragging ? "dragging" : ""}`}
            key={index}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("taskId", id.toString());
            }}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};
