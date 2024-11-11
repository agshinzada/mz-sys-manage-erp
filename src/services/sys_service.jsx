import { notification } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

export async function fetchSysStatusCodes(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sys/status?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchSysStatusCodesByParam(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/sys/status/search.${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchNewStatus(data, token) {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/sys/status?token=${token}`,
      data
    );
    Swal.fire("Əlavə edildi!", "", "success");
  } catch (error) {
    Swal.fire("Sistem xətası", error.response.data, "error");
  }
}
