
import http from "./httpService";
import { REGISTER_API } from "../config";
const apiEndPoint = "/users/register";

export function register(user) {
  return http.post(REGISTER_API, user);
}
