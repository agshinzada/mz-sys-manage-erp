import { notification } from "antd";
import axios from "axios";

export async function fetchDevices(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mobim/devices?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchDevicesByParam(value, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mobim/devices/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

// export async function fetchUpdateBrand(data, id, token) {
//   try {
//     const response = await axios.put(
//       `${import.meta.env.VITE_API_URL}/clients/brands/${id}?token=${token}`,
//       data
//     );
//     notification.success({ message: response.data });
//   } catch (error) {
//     notification.error({ message: error.response.data });
//   }
// }

// export async function fetchPostBrand(data, token) {
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/clients/brands?token=${token}`,
//       data
//     );
//     notification.success({ message: response.data });
//   } catch (error) {
//     notification.error({ message: error.response.data });
//   }
// }
