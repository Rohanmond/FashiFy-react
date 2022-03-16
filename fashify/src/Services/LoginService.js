import axios from "axios";

export const LoginService = async ({ email, password }) =>
  axios.post("/api/auth/login", {
    email,
    password,
  });
