import { notification } from "antd";
import axios from "axios";

export async function fetchPayments(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/payments?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchDelayedPayments(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/payments/delayed?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPaymentsByParam(data, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/payments/search?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPaymentRemain(data, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/payments/remain?token=${token}`,
      {
        params: data,
      }
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchChangePaymentStatus(data, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/payments/status?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
