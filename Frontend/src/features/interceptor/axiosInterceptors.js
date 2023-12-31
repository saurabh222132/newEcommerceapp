import axios from "axios";
import { baseURL } from "../../app/constants";

const api = axios.create({
  baseURL: baseURL,
});
//======================== Add a request interceptor=================
api.interceptors.request.use(
  async function (config) {
    // Do something before request is sent

    config.withCredentials = true;
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

//======================== Add a response interceptor=================
// Response interceptor (Handle token refreshing)
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // here we handle only 403 or 401 status error which is returned by the expired token

    console.log("response error ", error);

    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Refreshing The token...");

        await api.get("/auth/refresh").then(async (res) => {
          const newAccessToken = res.data.accessToken;
          window.localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        });

        return api(originalRequest);
      } catch (refreshError) {
        //Handle token refresh error (e.g., logout user )
        console.log("refrsh error", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
