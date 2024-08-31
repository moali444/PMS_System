import "./TaskData.scss";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TASKS_PROJECTS_URLS,
  USERS_URLS,
} from "../../../../constants/END_POINTS";
import { getToken } from "../../../../constants/Tokenhandler";
import "./TaskData.scss";
import { Alert, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

interface IFormInput {
  title?: string;
  description?: string;
  employeeId: Number;
  projectId: Number;
}

interface User {
  userName: string;
  id: number;
}

interface Project {
  title: string;
  id: number;
}

const TaskData = () => {
  return <div>TaskData</div>;
};

export default TaskData;
