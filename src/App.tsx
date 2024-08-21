import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Login from "./modules/Auth/components/Login/Login";
import Register from "./modules/Auth/components/Register/Register";
import ChangePass from "./modules/Auth/components/ChangePass/ChangePass";
import VerifyAccount from "./modules/Auth/components/VerifyAccount/VerifyAccount";
import ForgetPass from "./modules/Auth/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/Auth/components/ResetPass/ResetPass";
import Dashboard from "./modules/Dashboard/components/Dashboard";
import ProjectsList from "./modules/Projects/components/ProjectsList/ProjectsList";
import ProjectData from "./modules/Projects/components/ProjectData/ProjectData";
import TasksList from "./modules/Tasks/components/TasksList/TasksList";
import TaskData from "./modules/Tasks/components/TaskData/TaskData";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import Welcome from "./modules/Welcome/components/Welcome";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";

const App = () => {
  const routs = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Welcome /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "change-pass", element: <ChangePass /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "", element: <Dashboard /> },
        { path: "projects", element: <ProjectsList /> },
        { path: "project-data", element: <ProjectData /> },
        { path: "tasks", element: <TasksList /> },
        { path: "tasks-data", element: <TaskData /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routs} />
      <ToastContainer />
    </>
  );
};

export default App;
