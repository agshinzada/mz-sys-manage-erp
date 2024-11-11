import { Button, DatePicker, Form, Select } from "antd";
import { CloseCircleOutlined, LoginOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import {
  fetchChangeTaskDate,
  fetchCloseAllTasks,
  fetchOpenAllTasks,
} from "../../services/mobim/services_service";
import Swal from "sweetalert2";

const TaskOperationForm = ({ setLoading, loading }) => {
  const { user } = useAuth();

  async function openAllTasks() {
    setLoading(true);
    Swal.fire({
      title: "Bütün taskların tarixi cari gün olacaq",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchOpenAllTasks(user.TOKEN);
        if (res.error) {
          Swal.fire("Sistem xətası", res.response.ErrorMessage, "error");
        } else {
          Swal.fire("Sistem aktiv edildi!", "", "success");
        }
      }
    });
    setLoading(false);
  }

  async function closeAllTasks() {
    setLoading(true);
    Swal.fire({
      title: "Bütün taskların tarixi 1 gün əvvəl olacaq",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchCloseAllTasks(user.TOKEN);
        if (res.error) {
          Swal.fire("Sistem xətası", res.response.ErrorMessage, "error");
        } else {
          Swal.fire("Sistem bağlandı!", "", "success");
        }
      }
    });
    setLoading(false);
  }

  async function changeTaskParam() {
    setLoading(true);
    // await fetchPostBrand(params, user.TOKEN);
    // setLoadingFetch(false);
  }

  async function changeTaskDate() {
    setLoading(true);
    Swal.fire({
      title: "Seçili taskların tarixi dəyişəcək",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "İmtina",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchChangeTaskDate(user.TOKEN);
        if (res.error) {
          Swal.fire("Sistem xətası", res.response.ErrorMessage, "error");
        } else {
          Swal.fire("Sistem bağlandı!", "", "success");
        }
      }
    });
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <p>Sistem əməliyyatları</p>
      <div className="border p-5 flex items-center justify-between gap-2">
        <div className="flex flex-col gap-4">
          <Form layout="vertical" onFinish={changeTaskParam} autoComplete="off">
            <div className="flex gap-2">
              <Form.Item
                label="Task"
                name="task"
                className="w-44 m-0"
                rules={[
                  {
                    required: true,
                    message: "Input your value",
                  },
                ]}
              >
                <Select
                  // onChange={handleChange}
                  options={[
                    {
                      value: "active",
                      label: "Status",
                    },
                    {
                      value: "task1",
                      label: "Satış və qaytarma",
                    },
                    {
                      value: "task2",
                      label: "Kassa",
                    },
                    {
                      value: "task3",
                      label: "Anbar qəbzi",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                className="w-40 m-0"
                rules={[
                  {
                    required: true,
                    message: "Input your value",
                  },
                ]}
              >
                <Select
                  // onChange={handleChange}
                  options={[
                    {
                      value: 0,
                      label: "Active",
                    },
                    {
                      value: 1,
                      label: "Passive",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item className="self-end m-0">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={openAllTasks}
            >
              Sistemi aç
            </Button>
            <Button
              type="primary"
              icon={<CloseCircleOutlined />}
              onClick={closeAllTasks}
              danger
            >
              Sistemi bağla
            </Button>
          </div>
          <Form layout="vertical" onFinish={changeTaskDate} autoComplete="off">
            <div className="flex gap-2">
              <Form.Item
                label="Tarix"
                name="date"
                className="w-full m-0"
                rules={[
                  {
                    required: true,
                    message: "Input your value",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item className="self-end m-0">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaskOperationForm;
