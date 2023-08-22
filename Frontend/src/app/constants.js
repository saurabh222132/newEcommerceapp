export const ITEMS_PER_PAGE = 10;

// this is base url for all the data fetching

// export const baseURL = "http://localhost:8080";
export const baseURL = "https://ecommerce-backend-yawo.onrender.com/";

// THis url is only used to make request of auth route like login , signup
//  Note that don't add the slase in the last of the url  "http://localhost:8080/" this is wrong url

//export const authApiBaseUrl = "http://localhost:8080";
export const authApiBaseUrl = "https://ecommerce-backend-yawo.onrender.com";

export function discountedPrice(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
}
