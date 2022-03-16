import axios from "axios";

export const LoginService = async (email, password) => {
  return (
    await axios.post("/api/auth/login"),
    {
      email,
      password,
    }
  );
};
