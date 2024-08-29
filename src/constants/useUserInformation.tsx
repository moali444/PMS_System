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

  const [loading, setLoading] = useState<boolean>(true);

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
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };
    getCurrentUser();
  }, []);
  return { userInformation, loading };
};

export default useUserInformation;
