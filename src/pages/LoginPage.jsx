import { Button, Form, Input } from "antd";
import logo from "../assets/logo.svg";
import MainFooter from "../components/Footer/Footer";
import newClient from "../assets/newClient.svg";
import archive from "../assets/archive.svg";
import transport from "../assets/transport.svg";
import inventory from "../assets/inventory.svg";
import ProjectCard from "../components/ProjectCard";
import bcrypt from "bcryptjs";
import { fetchLogin } from "../services/user_service";
import { useAuth } from "../context/AuthContext";
import { encryptStorage } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const hashedPass = bcrypt.hashSync(
      values.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    const res = await fetchLogin({
      password: hashedPass,
      username: values.username,
    });
    if (res) {
      setUser(res);
      encryptStorage.setItem("user", res);
      navigate("/");
    } else {
      console.log("error", res);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-slate-100">
      <div className="bg-white p-16 rounded-md my-auto">
        <div className="demo-logo-vertical flex items-center justify-center gap-2 px-3 py-5 mb-7">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-gray-600 text-xl font-bold">SYS manage</h1>
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex gap-3 mb-5">
        <ProjectCard
          image={newClient}
          title={"Müştəri idarəetmə paneli"}
          imageSize={"w-6"}
          link="http://10.1.163.151:3002/"
        />
        <ProjectCard
          image={archive}
          title={"Arxiv idaretmə paneli"}
          imageSize={"w-6"}
          link="http://10.1.182.72:3005/"
        />

        <ProjectCard
          image={transport}
          title={"Nəqliyyat idarəetmə paneli"}
          imageSize={"w-6"}
          link="http://10.1.163.151:3001/"
        />
        <ProjectCard
          image={inventory}
          title={"Stok idarəetmə paneli"}
          imageSize={"w-6"}
          link="http://10.1.163.151:3003/"
        />
      </div>
      <div className="">
        <MainFooter />
      </div>
    </div>
  );
};
export default LoginPage;
