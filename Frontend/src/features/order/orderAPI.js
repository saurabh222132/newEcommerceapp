import api from "../interceptor/axiosInterceptors";

export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await api.post("/orders", order);
    const data = await response.data;
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await api.patch("/orders/" + order.id, order);
    const data = await response.data;
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await api.get("/orders?" + queryString);
    const data = await response.data;
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
