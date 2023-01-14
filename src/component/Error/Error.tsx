import './error.scss';

const OfError: React.FC = () => {
  return (
    <div className={'error-container'}>
      <span>'ОШИБКА ЗАГРУЗКИ!!!'</span>
      <p>'Проверьте соединение с интернетом и повторите запрос!'</p>
    </div>
  );
}

export default OfError;
