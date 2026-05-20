import api from "./api";

export const getAllUsers =
  async () => {

    const response =
      await api.get(
        "/users/sales"
      );

    return response.data;
  };