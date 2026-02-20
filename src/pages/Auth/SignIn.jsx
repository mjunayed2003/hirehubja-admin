import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usePostLoginMutation } from "../../redux/features/Auth/authApi";
import Swal from "sweetalert2";
import { setLogin } from "../../redux/features/Auth/authSlice";
import logo from "../../assets/image/logo.svg";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [mutation, { isLoading }] = usePostLoginMutation();

  const onFinish = async (values) => {
    try {
      const response = await mutation(values).unwrap();
      localStorage.setItem("token", response?.data?.tokens?.accessToken);
      dispatch(
        setLogin({
          user: { ...response?.data?.user, _id: response?.data?.user?.id },
          token: response?.data?.tokens?.accessToken,
        })
      );
      navigate(location.state ? location.state : "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!!",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#D6F8D6]">
      <div 
        className="bg-white rounded-[20px] flex flex-col items-center box-border"
        style={{
            width: '630px',
            height: '761px',
            paddingTop: '80px',
            paddingLeft: '54px',
            paddingRight: '54px',
        }}
      >
        <div className="text-center w-full mb-8">
          <img 
            src={logo} 
            alt="HireHubJA" 
            className="h-[150px] mx-auto mb-4 object-contain" 
          />
          <h2 className="text-[30px] font-bold text-gray-900 mb-2">
            Login to Account
          </h2>
          <p className="text-[#6B7280] text-[15px]">
            Please enter your email and password to continue
          </p>
        </div>

        <Form
          name="login_form"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          className="w-full"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email address</label>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
              className="mb-0"
            >
              <Input
                placeholder="esteban_schiller@gmail.com"
                className="bg-[#F3F4F6] border-none hover:bg-[#F3F4F6] focus:bg-white focus:ring-1 focus:ring-green-500 h-[50px] rounded-lg text-gray-700 px-4"
              />
            </Form.Item>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
              className="mb-0"
            >
              <Input.Password
                placeholder="**********"
                className="bg-[#F3F4F6] border-none hover:bg-[#F3F4F6] focus:bg-white focus:ring-1 focus:ring-green-500 h-[50px] rounded-lg text-gray-700 px-4"
              />
            </Form.Item>
          </div>

          <div className="flex justify-between items-center mb-10 mt-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-500">Remember Password</Checkbox>
            </Form.Item>
            
            <span
              onClick={() => navigate("/auth/forgot-password")}
              className="text-gray-500 hover:text-green-600 cursor-pointer text-sm font-medium"
            >
              Forget Password?
            </span>
          </div>

          <Form.Item className="mb-0">
            <Button
              htmlType="submit"
              block
              loading={isLoading}
              className="bg-[#4CAF50] hover:bg-[#43a047] text-white font-bold border-none rounded-lg h-[50px] text-[16px]"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;