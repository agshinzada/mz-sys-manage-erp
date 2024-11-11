import { notification } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

export async function fetchServices(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mobim/services?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
export async function fetchServiceTasks(token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mobim/services/tasks?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchServiceTasksByParam(value, token) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/mobim/services/tasks/${value}?token=${token}`
    );
    return response.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchOpenAllTasks(token) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/mobim/services/tasks/open?token=${token}`
    );
    return response.data;
  } catch (error) {
    Swal.fire("Sistem xətası", error.response.data, "error");
  }
}

export async function fetchCloseAllTasks(token) {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/mobim/services/tasks/close?token=${token}`
    );
    return response.data;
  } catch (error) {
    Swal.fire("Sistem xətası", error.response.data, "error");
  }
}

export async function fetchChangeTaskDate(data, token) {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/mobim/services/tasks/date?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    Swal.fire("Sistem xətası", error.response.data, "error");
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
