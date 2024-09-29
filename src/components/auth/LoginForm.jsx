import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import Fild from "../common/Fild";
export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status == 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          console.log(`login time auth token: ${authToken}`);

          setAuth({ user, authToken, refreshToken });

          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found `,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Fild label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID is Required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          } `}
          type="email"
          name="email"
          id="email"
        />
      </Fild>

      <Fild label="password" error={errors.password}>
        <input
          {...register("password", {
            required: "password is Required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 chareacter",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          } `}
          type="password"
          name="password"
          id="password"
        />
      </Fild>
      <p>{errors?.root?.random?.message}</p>
      <Fild>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Fild>
    </form>
  );
}
