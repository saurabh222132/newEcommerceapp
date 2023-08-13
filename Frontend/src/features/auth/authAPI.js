import api from "../interceptor/axiosInterceptors";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await api.post(
      "/auth/signup",

      userData
    );
    // const data = await response.json();

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
      const response = await api.post("/auth/login", loginInfo);

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
    const response = await api.get("/auth/logout");

    resolve({ data: response.data.message });
  });
}
