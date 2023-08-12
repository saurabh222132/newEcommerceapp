import api from "../interceptor/axiosInterceptors";

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await api.get(
      "http://localhost:8080/orders/user/" + userId
    );
    const data = await response.data;
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await api.get("http://localhost:8080/users/" + userId);
    const data = await response.data;
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await api.patch(
      "http://localhost:8080/users/" + update.id,
      update
    );
    const data = await response.data;
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
