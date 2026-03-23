import api from "./api";

export const signup = async (payload) => {
  const { data } = await api.post("/api/auth/signup", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
};
