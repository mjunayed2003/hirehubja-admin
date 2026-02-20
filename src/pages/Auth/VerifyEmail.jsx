import { Button } from "antd";
import Form from "antd/es/form/Form";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import {
  useVerifyEmailMutation,
  useLazyResendOTPQuery,
} from "../../redux/features/Auth/authApi";
// Imported as requested
import logo from "../../assets/image/logo.svg"; 

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming 'id' contains the email
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [triggerResendOTP, { isLoading: resendLoading }] = useLazyResendOTPQuery();

  const [otpExpire, setOtpExpire] = useState(() => {
    const storedExpire = sessionStorage.getItem("otpExpire");
    return storedExpire ? parseInt(storedExpire, 10) : Date.now() + 60 * 1000;
  });

  useEffect(() => {
    sessionStorage.setItem("otpExpire", otpExpire.toString());

    const updateTimer = () => {
      const remaining = Math.floor((otpExpire - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimer(0);
        sessionStorage.removeItem("otpExpire");
      } else {
        setTimer(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [otpExpire]);

  const handleResend = async () => {
    try {
      // Logic for resend token
      // const token = sessionStorage.getItem("resend-token");
      // if (!token) throw new Error("Resend token not found.");
      
      // const res = await triggerResendOTP({ token }).unwrap();
      
      Swal.fire({
        icon: "success",
        title: "OTP Resent!",
        timer: 1000,
        showConfirmButton: false,
      });

      const newExpire = Date.now() + 60 * 1000;
      setOtpExpire(newExpire);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to resend OTP",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const onFinish = async () => {
    try {
      // Verification logic here
      // const response = await verifyEmail({ id, otp }).unwrap();
      navigate(`/auth/reset-password`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!!",
        text: "Something went wrong.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#D6F8D6]">
      {/* Centered Card */}
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
        {/* Logo and Header */}
        <div className="text-center w-full mb-8">
          <img 
            src={logo} 
            alt="HireHubJA" 
            className="h-[150px] mx-auto mb-4 object-contain" 
          />
          <h2 className="text-[30px] font-bold text-gray-900 mb-2">
            Check your email
          </h2>
          <p className="text-[#6B7280] text-[15px] leading-relaxed">
            We sent a reset link to {id || "contact@dscode...com"} <br />
            enter 5 digit code that mentioned in the email
          </p>
        </div>

        {/* OTP Form */}
        <Form
          name="verify_email"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          className="w-full flex flex-col items-center"
        >
          <div className="mb-8 w-full flex justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={5} // Set to 5 digits as per image text
              renderSeparator={<span className="w-4"></span>} // Spacing between inputs
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "60px",
                height: "60px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#F3F4F6", // Light gray background
                fontSize: "24px",
                color: "#374151",
                fontWeight: "500",
                outline: "none",
              }}
              focusStyle={{
                border: "1px solid #4CAF50",
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          <div className="w-full mb-6">
            <Button
              htmlType="submit"
              block
              loading={isLoading}
              className="bg-[#4CAF50] hover:bg-[#43a047] text-white font-bold border-none rounded-lg h-[50px] text-[16px] w-full"
            >
              Verify Code
            </Button>
          </div>

          {/* Footer / Resend */}
          <div className="text-gray-500 text-sm">
            You have not received the email?{" "}
            {timer > 0 ? (
              <span className="text-gray-400 cursor-not-allowed">
                Resend in {timer}s
              </span>
            ) : (
              <span 
                onClick={handleResend} 
                className="text-[#4CAF50] font-medium underline cursor-pointer hover:text-green-700"
              >
                Resend
              </span>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;