import { notification } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

export async function fetchOrders(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
      params: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    notification.error({ message: error.response.data });
  }
}

export async function fetchDelayedOrders(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/orders/delayed`,
      {
        params: {
          token,
        },
      }
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchOrdersByParam(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/orders/search?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchOrderLinesById(data, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/orders/lines?token=${token}`,
      {
        params: {
          orderId: data,
        },
      }
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchChangeOrderStatus(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/orders/status?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    Swal.fire("Sistem xətası", error.response.data, "error");
  }
}
