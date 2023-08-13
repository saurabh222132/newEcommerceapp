import api from "../interceptor/axiosInterceptors";

export function fetchCount(amount = 1) {
  return new Promise(async (resolve) => {
    const response = await api.get("");
    const data = await response.data;
    resolve({ data });
  });
}
