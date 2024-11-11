import { notification } from "antd";
import axios from "axios";

export async function fetchClientLogs(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/logs?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchClientLogsBySearch(data, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/clients/logs/search?q=${data}&token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
