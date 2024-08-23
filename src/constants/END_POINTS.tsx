const BASE_URL = "https://upskilling-egypt.com:3003/api/v1";
export const BASE_IMG_URL = "https://upskilling-egypt.com:3003";

// USERS URL
const BASE_USERS = `${BASE_URL}/Users`;

export const USERS_URLS = {
  login: `${BASE_USERS}/Login`,
  register: `${BASE_USERS}/Register`,
  verify: `${BASE_USERS}/verify`,
};

// HEADERS TOKEN
export const BASE_HEADERS = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
};
