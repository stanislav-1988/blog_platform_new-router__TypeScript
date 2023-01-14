import './authorization.scss';
import ServesServer from '../../serves_server';
import ArticleList from '../ArticleList';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userActionType, useAuthorizationFormType, AuthorizationType } from '../../type/type';
import { useAppSelector } from '../../hook/hook';
import { useDispatch } from 'react-redux';

const serves = new ServesServer();

const Authorization: React.FC = () => {
  const navigate = useNavigate();
  const { errorAuthorization } = useAppSelector(state => state);
  const styleError = errorAuthorization ? 'authorization-error' : 'display-none';
  const dispatch = useDispatch();
  const userData = sessionStorage.getItem('user');
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<useAuthorizationFormType>({
    mode: 'onBlur',
  });

  if (userData) {
    return <ArticleList />;
  }

  const sendingDataForAuthorization = handleSubmit((e) => {

    const result: AuthorizationType = {
      user: {
        email: e.login.toLowerCase(),
        password: e.password,
      },
    };
    console.log(result);
    serves.authorization(result).then(
      (el) => {
        if (el.errors) {
          dispatch({type: userActionType.successfulAuthorization, payload: true});
          return el;
        }
        sessionStorage.setItem('user', JSON.stringify(el.user));
        dispatch({type: userActionType.authorizationData, payload: el.user});
        const authorizationUser = localStorage.getItem(JSON.stringify(el.user.username))

        if (!authorizationUser) {
          localStorage.setItem(JSON.stringify(el.user.username), JSON.stringify(['']));
        }
        dispatch({type:userActionType.successfulAuthorization, payload: false});
        return el;
      },
      () => {
        navigate('/error');
      }
    );
    reset();
  });

  return (
    <div className={'authorization-form'}>
      <span className={`${styleError}`}>Пользователь не найден! Проверьте введённые данные и повторите!</span>
      <h3>Sign In</h3>
      <form onSubmit={sendingDataForAuthorization}>
        <label htmlFor="emailAuthorization">Email address</label>
        <input
          type="email"
          {...register('login', {
            required: 'введите емайл',
            pattern: {
              value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,4})+$/,
              message: 'некорректный адрес почты',
            },
          })}
          id="emailAuthorization"
          style={{ borderColor: errors.login && 'red' }}
          placeholder="Email address"
        />
        <div>{errors?.password && <p>{errors?.login?.message || 'Error!'}</p>}</div>
        <label htmlFor="passwordAuthorization">Password</label>
        <input
          type="password"
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: 'минимальная длинна пароля 6 символов',
            },
            maxLength: {
              value: 40,
              message: 'максимальная длинна пароля 40 символов',
            },
          })}
          id="passwordAuthorization"
          placeholder="Password"
        />
        <div>{errors?.password && <p>{errors?.password?.message || 'пароль не введен'}</p>}</div>
        <input className={'submit-login'} type="submit" value="Login" />
      </form>
      <span className={'registration-link'}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </span>
    </div>
  );
}

export default Authorization;
