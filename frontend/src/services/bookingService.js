import api from "./api";

export const createBooking = async (payload) => {
  const { data } = await api.post("/api/bookings", payload);
  return data;
};

export const getUserBookings = async (userId) => {
  const { data } = await api.get(`/api/bookings/user/${userId}`);
  return data;
};

export const cancelBooking = async (bookingId) => {
  const { data } = await api.put(`/api/bookings/${bookingId}/cancel`);
  return data;
};
