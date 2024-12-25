import { notification } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

export async function fetchSysUsers(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/users?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchSysUsersByParam(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/users/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchNewUser(data, token) {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register?token=${token}`,
      data
    );
    Swal.fire("Əlavə edildi!", "", "success");
  } catch (error) {
    Swal.fire("Sistem xətası", error.response.data, "error");
  }
}

export async function fetchPutSysUser(id, data, token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/auth/users/${id}?token=${token}`,
      data
    );
    notification.error({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchPutSysUserPassword(id, data, token) {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/auth/users/password/${id}?token=${token}`,
      data
    );
    notification.error({ message: response.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchLogin(data) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      data
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
}
