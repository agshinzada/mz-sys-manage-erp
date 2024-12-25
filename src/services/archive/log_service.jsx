import { notification } from "antd";
import axios from "axios";

export async function fetchArchiveLogs(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/archive/logs?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchArchiveLogsBySearch(data, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/archive/logs/search?q=${data}&token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
