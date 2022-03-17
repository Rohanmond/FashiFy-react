import axios from "axios";

export const LoginService = async ({ email, password }) =>
  axios.post("/api/auth/login", {
    email,
    password,
  });
export const GetAllProducts = async () => axios.get("/api/products");

export const GetAllCategories = async () => axios.get("/api/categories");

export const GetAllSizes = async () => await axios.get("/api/sizes");

export const GetWishList = async ({ encodedToken }) =>
  await axios.get("/api/user/wishlist", {
    headers: {
      authorization: encodedToken,
    },
  });

export const PostWishList = async ({ product, encodedToken }) => {
  return await axios.post(
    "/api/user/wishlist",
    { product },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
};

export const DeleteWish = async ({ productId, encodedToken }) => {
  return await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });
};
