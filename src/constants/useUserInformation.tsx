import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { USERS_URLS } from "./END_POINTS";
import { getToken } from "./Tokenhandler";

interface userInforamtionType {
  userName: string;
  email: string;
  imagePath: null | string;
  isActivated: boolean;
}
interface ErrorResponse {
  message: string;
}
const useUserInformation = () => {
  const [userInformation, setUserInformation] =
    useState<userInforamtionType | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get<userInforamtionType>(
          USERS_URLS.currentUser,
          {
            headers: { Authorization: getToken() },
          }
        );
        const { userName, email, imagePath, isActivated } = response.data;
        setUserInformation({ userName, email, imagePath, isActivated });
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.log(axiosError);
      }
    };
    getCurrentUser();
  }, []);
  return { userInformation };
};

export default useUserInformation;
