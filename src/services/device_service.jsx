import { notification } from "antd";
import axios from "axios";

export async function fetchDeviceById(data, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/devices/${data}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
