import { axiosInstance } from "./index";

export const createNewMsg = async (message) => {
  try {
    const response = await axiosInstance.post(
      "api/message/send-message",
      message
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
