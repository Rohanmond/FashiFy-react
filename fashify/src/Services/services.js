import axios from "axios";

export const LoginService = async ({ email, password }) =>
  axios.post("/api/auth/login", {
    email,
    password,
  });
export const GetAllProducts = async () => axios.get("/api/products");
export const GetAllCategories = async () => axios.get("/api/categories");
export const GetAllSizes = async () => await axios.get("/api/sizes");
