import LoginForm from "@/pages/Login/ui/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-w-[300px] max-w-[80vw] md:max-w-[400px] mx-auto">
      <div className="w-full p-6 rounded-xl shadow-md bg-gray-400/30 backdrop-blur-xs">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
