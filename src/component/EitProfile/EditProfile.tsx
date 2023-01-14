import './editProfile.scss';
import { useAppSelector } from '../../hook/hook';
import { userActionType, ReplaceUserDataFormType, AuthorizationType } from '../../type/type';
import ServesServer from '../../serves_server';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const serves = new ServesServer();

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errorAuthorization, authorizationData } = useAppSelector(state => state);
  const styleError = errorAuthorization ? 'edit-profile-error' : 'display-none';
  let token: string;
  if (authorizationData) {
    token  = authorizationData.token;
  }
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ReplaceUserDataFormType>();

  const profileEditRequest = handleSubmit((e) => {
    const date: AuthorizationType = {
      user: {
        email: e.email.toLowerCase(),
        password: e.password,
        image: e.photo,
        username: e.login,
      },
    };
    if (token) {
      serves.replaceUserData(date, token).then(
      (el) => {
        if (el.errors) {
          dispatch({type : userActionType.successfulAuthorization, payload: true});
          return el;
        }
        sessionStorage.setItem('user', JSON.stringify(el.user));
        return el;
      },
      () => {
        navigate('/error');
      }
    );
    }
    
    reset();
  });

  return (
    <div className={'editProfile-list'}>
      <span className={`${styleError}`}>
        Не удалось выполнить запрос, проверьте введенные данные и повторите!
      </span>
      <h3>Edit Profile</h3>
      <form onSubmit={profileEditRequest}>
        <label>Username</label>
        <input
          {...register('login', {
            required: 'придумайте логин',
            minLength: {
              value: 3,
              message: 'минимальная длинна логина 3 символов',
            },
            maxLength: {
              value: 20,
              message: 'максимальная длинна логина 20 символов',
            },
          })}
          type="text"
          placeholder="Username"
        />
        <div>{errors?.login && <p>{errors?.login?.message || 'Error!'}</p>}</div>
        <label>Email address</label>
        <input
          {...register('email', {
            required: 'введите корректный адрес',
            pattern: {
              value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,4})+$/,
              message: 'некорректный адрес почты',
            },
          })}
          style={{ borderColor: errors.email && 'red' }}
          type="email"
          placeholder="Email address"
        />
        <div>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
        <label>New password</label>
        <input style={{ borderColor: errors.repeatPassword && 'red' }} type="password" placeholder="Password" />
        <div>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
        <label>Avatar image (url)</label>
        <input
          {...register('photo', {
            required: 'придумайте пароль от 6 до 40 символов',
            pattern: {
              value:
                /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/,
              message: 'некорректный url',
            },
          })}
          style={{ borderColor: errors.repeatPassword && 'red' }}
          type="text"
          placeholder="url photo"
        />
        <div>{errors?.photo && <p>{errors?.photo?.message || 'Error!'}</p>}</div>
        <input className={'submit-editProfile'} type="submit" value="Save" />
      </form>
    </div>
  );
}

export default EditProfile;
