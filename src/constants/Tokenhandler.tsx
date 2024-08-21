export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

export const checkTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};
