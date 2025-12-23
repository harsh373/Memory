import api from "./axios";

export const loginAdmin = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", payload);
  return res.data; 
};
