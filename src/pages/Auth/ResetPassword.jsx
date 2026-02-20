import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/features/Auth/authApi";
import Swal from "sweetalert2";
import logo from "../../assets/image/logo.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const onFinish = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      // API কল লজিক (প্রয়োজন হলে আনকমেন্ট করুন)
      // const token = sessionStorage.getItem("resend-token");
      // await resetPassword({ token, data: values }).unwrap();

      setShowSuccess(true);
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed !!",
        text: (error.message || "Something went wrong.") + " Please try again.",
      });
    }
  };

  const handleContinue = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#D6F8D6]">
      <div 
        className="bg-white rounded-[20px] flex flex-col items-center"
        style={{
            width: '630px',
            paddingTop: '60px',
            paddingBottom: '60px', 
            paddingLeft: '54px',
            paddingRight: '54px',
        }}
      >
        <div className="mb-6">
          <img 
            src={logo} 
            alt="HireHubJA" 
            className="h-[150px] mx-auto object-contain" 
          />
        </div>

        {!showSuccess ? (
          /* ==================== FORM VIEW ==================== */
          <>
            <div className="text-center w-full mb-8">
              <h2 className="text-[30px] font-bold text-gray-900 mb-2">
                Set a new password
              </h2>
              <p className="text-[#6B7280] text-[15px] max-w-md mx-auto leading-relaxed">
                Create a new password. Ensure it differs from <br/> previous ones for security.
              </p>
            </div>

            <Form
              name="reset_password"
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              className="w-full"
            >
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">New Password</label>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Password is required!" }]}
                  className="mb-0"
                >
                  <Input.Password
                    placeholder="**********"
                    className="bg-[#F3F4F6] border-none hover:bg-[#F3F4F6] focus:bg-white focus:ring-1 focus:ring-green-500 h-[50px] rounded-lg text-gray-700 px-4"
                  />
                </Form.Item>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                  ]}
                  className="mb-0"
                >
                  <Input.Password
                    placeholder="**********"
                    className="bg-[#F3F4F6] border-none hover:bg-[#F3F4F6] focus:bg-white focus:ring-1 focus:ring-green-500 h-[50px] rounded-lg text-gray-700 px-4"
                  />
                </Form.Item>
              </div>

              <Form.Item className="mb-0">
                <Button
                  htmlType="submit"
                  block
                  loading={isLoading}
                  className="bg-[#4CAF50] hover:bg-[#43a047] text-white font-bold border-none rounded-lg h-[50px] text-[16px]"
                >
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          /* ==================== SUCCESS VIEW ==================== */
          <>
            <div className="text-center w-full mb-8">
              <h2 className="text-[30px] font-bold text-gray-900 mb-4">
                Successfully
              </h2>
              <p className="text-[#6B7280] text-[15px] max-w-lg mx-auto leading-relaxed">
                Your password has been updated, please change your password regularly to avoid this happening
              </p>
            </div>

            <div className="w-full">
              <Button
                onClick={handleContinue}
                block
                className="bg-[#4CAF50] hover:bg-[#43a047] text-white font-bold border-none rounded-lg h-[50px] text-[16px]"
              >
                Continue
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;