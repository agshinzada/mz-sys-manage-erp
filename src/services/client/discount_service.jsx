import { notification } from "antd";
import axios from "axios";

export async function fetchDiscounts(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/clients/discounts?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchDiscountsByParam(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/clients/discounts/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUpdateDiscount(data, id, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/clients/discounts/${id}?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPostDiscount(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/clients/discounts?token=${token}`,
      data
    );
    notification.success({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
