import api from "../interceptor/axiosInterceptors";

export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await api.post("/cart", item);
    const data = response.data;
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await api.get("/cart?user=" + userId);
    const data = await response.data;
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await api.patch("/cart/" + update.id, update);
    const data = await response.data;
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    await api.delete("/cart/" + itemId).then((res) => {
      return console.log("itemID: ", itemId, " deleted from cart");
    });

    // TODO: on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
}

export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
