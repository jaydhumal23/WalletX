import '@ant-design/v5-patch-for-react-19';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import Spinner from "../components/Spinner";
import axios from "axios";
import Cookies from "js-cookie"

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Cookies.remove("token");
    document.title = "Expense Management System - Register";
    if (Cookies.get("username")) {
      navigate("/home")
    }
  }, [navigate]);

  const gotoLogin = () => {
    navigate("/login");
  };

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/v1/users/register", values); // { name, email, password }
      console.log(response.data);
      await new Promise((resolve) => setTimeout(resolve, 600));
      message.success("Registration successful! Please login.");

      setLoading(false)
      navigate("/login");
    } catch (err) {
      setLoading(false)
      console.error(err);
      message.error(err.response?.data?.message || "Registration failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Expense Management System
          </h1>
          <p className="text-gray-600 mt-2">Create your account to start tracking expenses</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg border-0 px-6 pt-5 pb-4">
          <div className="space-y-1 mb-6">
            <h2 className="text-2xl font-semibold text-center">Create Account</h2>
            <p className="text-center text-gray-600">Enter your details to create your new account</p>
          </div>

          <div className="space-y-4">
            <Form
              name="registerForm"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your full name!" }]}
              >
                <Input
                  placeholder="Enter your full name"
                  className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please create a password!" },
                  { min: 6, message: "Password must be at least 6 characters long!" },
                ]}
              >
                <Input.Password
                  placeholder="Create a password"
                  className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-md transition-all duration-200"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={gotoLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
              <div className="ml-43 mt-2">
                {loading && <Spinner />}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
