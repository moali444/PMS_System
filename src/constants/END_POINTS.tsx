const BASE_URL = "https://upskilling-egypt.com:3003/api/v1";
export const BASE_IMG_URL = "https://upskilling-egypt.com:3003";

// USERS URL
const BASE_USERS = `${BASE_URL}/Users`;

export const USERS_URLS = {
  login: `${BASE_USERS}/Login`,
  register: `${BASE_USERS}/Register`,
  forgetPass: `${BASE_USERS}/Reset/Request`,
  Reset: `${BASE_USERS}/Reset`,
  currentUser: `${BASE_USERS}/currentUser`,
  changePass: `${BASE_USERS}/ChangePassword`,
  getUsers: `${BASE_USERS}`,
  verify: `${BASE_USERS}/verify`,
};

export const BASE_PROJECTS = `${BASE_URL}/Project`;
export const PROJECTS_URLS = {
  getProjectsForManager: `${BASE_PROJECTS}/manager`,
  getProjectsForEmployee: `${BASE_PROJECTS}/employee`,
  UpdateProject: (id: Number) => {
    return `${BASE_PROJECTS}/${id}`;
  },
  getProject: (id: Number) => {
    return `${BASE_PROJECTS}/${id}`;
  },
  deleteProject: (id: number) => `${BASE_PROJECTS}/${id}`,
};

export const TASKS_URLS = {
  tasksManger: `${BASE_URL}/Task/manager`,
  delete: (id: number) => `${BASE_URL}/Task/${id}`,
  update: (id) => `${BASE_URL}/Task/${id}`,
  tasksCount: `${BASE_URL}/Task/count`,
  getAllAssignedTasks: `${BASE_URL}/Task`,
  changeStatus: (id: string) => `${BASE_URL}/Task/${id}/change-status`,
};

export const USERS_LIST = {
  getUsersUrls: `${BASE_URL}/Users/Manager`,
  toggleStatusUrls: (id) => `${BASE_URL}/Users/${id}`,
  usersCount: `${BASE_USERS}/count`,
};

// HEADERS TOKEN
export const BASE_HEADERS = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

//project tasks

const BASE_projects_task = `${BASE_URL}`;

export const TASKS_PROJECTS_URLS = {
  creatTaskByManger: `${BASE_projects_task}/Task`,
  getAllProject: `${BASE_projects_task}/Project`,
};
