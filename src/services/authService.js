import jwtDecode from "jwt-decode";
import { LOGIN_API, REGISTER_API, USER } from "../config";
import http from "./httpService";


const tokenKey = "token";

const remainingMilliseconds = 60 * 60 * 1000;
const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
const exp = expiryDate.toISOString();

http.setJwt(getJwt());

export function setAutoLogout(milliseconds) {
  setTimeout(() => {
    logout();
  }, milliseconds);
}

export async function login(email, password) {
  const { data: jwt } = await http.post(LOGIN_API, { email, password });
  localStorage.setItem(tokenKey, jwt);
  localStorage.setItem("expiry", exp);
}
export async function getLatestUser() {
  const response = await http.get(USER);
  return response.data;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function register(user) {
  const response = await http.post(REGISTER_API, user);
  return response;
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("expiry");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function autoLogout() {
  const token = localStorage.getItem(tokenKey);
  const exp = localStorage.getItem("expiry");

  if (!token || !exp) {
    return;
  }
  if (new Date(exp) <= new Date()) {
    logout();
    return;
  }
  const remainingMilliseconds = new Date(exp).getTime() - new Date().getTime();
  setAutoLogout(remainingMilliseconds);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  autoLogout,
  register,
  getLatestUser,
};
