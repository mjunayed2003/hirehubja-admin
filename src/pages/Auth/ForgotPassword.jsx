import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";
import Swal from "sweetalert2";
import logo from "../../assets/image/logo.svg"; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      // API call logic (Uncomment when ready)
      // const response = await forgotPassword(values).unwrap();
      // sessionStorage.setItem("resend-token", response?.data?.resetPasswordToken);
      
      // For now, navigating as per your previous logic
      navigate(`/auth/verify-email/${values.email}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!!",
        text: (error.message || error?.data?.message || "Something went wrong.") + " Please try again later."
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#D6F8D6]">
      {/* Centered Card Container */}
      <div 
        className="bg-white rounded-[20px] flex flex-col items-center"
        style={{
            width: '630px',
            // Height can be auto to fit content, or fixed like login if you want exact match
            paddingTop: '60px',
            paddingBottom: '60px', 
            paddingLeft: '54px',
            paddingRight: '54px',
        }}
      >
        {/* Logo and Text Header */}
        <div className="text-center w-full mb-8">
          <img 
            src={logo} 
            alt="HireHubJA" 
            className="h-[150px] mx-auto mb-4 object-contain" 
          />
          <h2 className="text-[30px] font-bold text-gray-900 mb-2">
            Forget Password
          </h2>
          <p className="text-[#6B7280] text-[15px]">
            Please enter your email and get code
          </p>
        </div>

        {/* Form Section */}
        <Form
          name="forgot_password"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          className="w-full"
        >
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">Email address</label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              className="mb-0"
            >
              <Input
                placeholder="esteban_schiller@gmail.com"
                className="bg-[#F3F4F6] border-none hover:bg-[#F3F4F6] focus:bg-white focus:ring-1 focus:ring-green-500 h-[50px] rounded-lg text-gray-700 px-4"
              />
            </Form.Item>
          </div>

          <Form.Item className="mb-0">
            <Button
              size="large"
              htmlType="submit"
              loading={isLoading}
              className="w-full bg-[#4CAF50] hover:bg-[#43a047] text-white font-bold border-none rounded-lg h-[50px] text-[16px]"
            >
              Send Code
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;