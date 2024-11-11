import { notification } from "antd";
import axios from "axios";

export async function fetchLogoOrdersByFilter(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/orders/logo/filter?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchLogoOrdersBySearch(data, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/orders/logo/search?q=${data}&token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
