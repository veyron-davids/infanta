
import http from "./httpService";

const apiEndPoint = "/users/register";

export function register(user) {
  return http.post(apiEndPoint, user);
}
