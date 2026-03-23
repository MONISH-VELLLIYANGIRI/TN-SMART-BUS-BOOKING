import api from "./api";

export const searchBuses = async ({ source, destination, date, time }) => {
  const { data } = await api.get("/api/buses/search", {
    params: { source, destination, date, time }
  });
  return data;
};

export const getBusById = async (id) => {
  const { data } = await api.get(`/api/buses/${id}`);
  return data;
};

export const getBusLocation = async (busId) => {
  const { data } = await api.get(`/api/bus/location/${busId}`);
  return data;
};
