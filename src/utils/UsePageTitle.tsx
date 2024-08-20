import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UsePageTitle = () => {
    const location = useLocation();

    useEffect(() => {
      switch (location.pathname) {
        case "/dashboard":
          document.title = "Home Page";
          break;
        case "/dashboard/projects":
          document.title = "Projects Page";
          break;
        case "/dashboard/project-data":
          document.title = "Project Data Page";
          break;
        case "/dashboard/tasks":
          document.title = "Tasks Page";
          break;
        case "/dashboard/tasks-data":
          document.title = "Tasks Data Page";
          break;
        case "/dashboard/users":
          document.title = "Users Page";
          break;
        default:
          document.title = "PMS";
      }
    }, [location.pathname]);
}

export default UsePageTitle