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

export const getAllMsgs = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `api/message/get-all-messages/${chatId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
