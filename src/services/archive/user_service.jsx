import { notification } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

export async function fetchArchiveUsers(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/archive/users?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchArchiveUsersByParam(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/archive/users/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchNewUser(data, token) {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/archive/register?token=${token}`,
      data
    );
    Swal.fire("Əlavə edildi!", "", "success");
  } catch (error) {
    Swal.fire("Sistem xətası", error.response.data, "error");
  }
}
