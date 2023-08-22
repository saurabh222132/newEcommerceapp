import api from "../interceptor/axiosInterceptors";
import axios from "axios";

const baseURL = "http://localhost:8080";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await axios.post(
      baseURL + "/auth/signup",

      userData,
      { withCredentials: true }
    );
    // const data = await response.json();

    localStorage.setItem("accessToken", response.data.accessToken);

    if (response.data?.message) {
      alert(response.data["message"]);
    }
    // TODO: on server it will only return some info of user (not password)
    else resolve({ data: response.data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(baseURL + "/auth/login", loginInfo, {
        withCredentials: true,
      });

      window.localStorage.setItem("accessToken", response.data.accessToken);
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }

    // TODO: on server it will only return some info of user (not password)
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    localStorage.removeItem("accessToken");
    const response = await axios.get(baseURL + "/auth/logout", {
      withCredentials: true,
    });

    resolve({ data: response.data.message });
  });
}
