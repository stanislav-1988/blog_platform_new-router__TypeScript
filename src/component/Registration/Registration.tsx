import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import ServesServer from "../../serves_server";
import { useAppSelector } from "../../hook/hook";
import {
  RegistrationDate,
  userActionType,
  RegistrationFormDate,
} from "../../type/type";

import "./registration.scss";

const serves = new ServesServer();

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorAuthorization } = useAppSelector((state) => state);
  const styleRegistration = errorAuthorization
    ? "registration-error"
    : "display-none";
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<RegistrationFormDate>();

  const registrationData = handleSubmit((e) => {
    const result: RegistrationDate = {
      user: {
        username: e.username,
        email: e.email.toLowerCase(),
        password: e.password,
      },
    };
    serves.registration(result).then(
      (el) => {
        if (el.errors) {
          dispatch({
            type: userActionType.successfulAuthorization,
            payload: true,
          });
          return el;
        }
        navigate("/articl");
        reset();
        return el;
      })
      .catch(() => navigate('/error'));
  });
  
  return (
    <div className={"registration-list"}>
      <div className={"registration-form"}>
        <div className={`${styleRegistration}`}>
          Пользователь с такой почтой уже зарегестрирован!
        </div>
        <h3>Create new account</h3>
        <form onSubmit={registrationData}>
          <label htmlFor="userNameRegistration">Username</label>
          <input
            {...register("username", {
              required: "придумайте логин",
              minLength: {
                value: 3,
                message: "минимальная длинна логина 3 символов",
              },
              maxLength: {
                value: 20,
                message: "максимальная длинна логина 20 символов",
              },
            })}
            id="userNameRegistration"
            style={{ borderColor: errors.username && "red" }}
            type="text"
            placeholder="Username"
          />
          <div>
            {errors?.username && <p>{errors?.username?.message || "Error!"}</p>}
          </div>
          <label htmlFor="emailRegistration">Email address</label>
          <input
            {...register("email", {
              required: "введите корректный адрес",
              pattern: {
                value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,4})+$/,
                message: "некорректный адрес почты",
              },
            })}
            id="emailRegistration"
            style={{ borderColor: errors.email && "red" }}
            type="email"
            placeholder="Email address"
          />
          <div>
            {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
          </div>
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "придумайте пароль от 6 до 40 символов",
              minLength: {
                value: 6,
                message: "минимальная длинна пароля 6 символов",
              },
              maxLength: {
                value: 40,
                message: "максимальная длинна пароля 40 символов",
              },
            })}
            id="password"
            style={{ borderColor: errors.repeatPassword && "red" }}
            type="password"
            placeholder="Password"
          />
          <div>
            {errors?.repeatPassword && (
              <p>{errors?.repeatPassword?.message || "пароли не совпадают"}</p>
            )}
          </div>
          <div>
            {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
          </div>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            {...register("repeatPassword", {
              required: "повторите пароль",
              minLength: {
                value: 6,
                message: "минимальная длинна пароля 6 символов",
              },
              maxLength: {
                value: 40,
                message: "максимальная длинна пароля 40 символов",
              },
              validate: (value) =>
                value === watch("password") || "пароли не совпадают",
            })}
            id="repeatPassword"
            style={{ borderColor: errors.repeatPassword && "red" }}
            type="password"
            placeholder="Repeat Password"
          />
          <div>
            {errors?.repeatPassword && (
              <p>{errors?.repeatPassword?.message || "Error!"}</p>
            )}
          </div>
          <div className={"agreement-container"}>
            <input
              {...register("checkbox", {
                required: true,
              })}
              style={{ color: errors.checkbox && "red" }}
              id="agreement"
              className={"agreement"}
              type="checkbox"
              placeholder="Repeat Password"
            />
            <label htmlFor="agreement">
              I agree to the processing of my personal information
            </label>
          </div>
          <div>{errors?.checkbox && <p>необходимо дать согласие!</p>}</div>
          <input className={"submit-create"} type="submit" value="Create" />
        </form>
        <span className={"registration-link"}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </span>
      </div>
    </div>
  );
};

export default Registration;
