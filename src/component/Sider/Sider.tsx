import { useAppDispatch, useAppSelector } from '../hook/hook';
import { inputAll, inputNonStop, inputOne, inputTwo, inputThree } from "../../state/reducer"; 
import { InputOnChangeType } from '../type/type';
import './sider.scss';

const Sider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { checkAll, checkNonStop, checkOne, checkTwo, checkThree } = useAppSelector(state => state.toolkit);
  const checkBoxArr = [checkNonStop, checkOne, checkTwo, checkThree];

  let inputCount: number = 0;
  checkBoxArr.forEach((el)=>{
    if (el) inputCount += 1;
  });
  const onClickAll: InputOnChangeType  = () => {
    if (checkAll) {
      dispatch(inputAll());
      if (checkNonStop) dispatch(inputNonStop());
      if (checkOne) dispatch(inputOne());
      if (checkTwo) dispatch(inputTwo());
      if (checkThree) dispatch(inputThree());
    }
    if (!checkAll) {
      dispatch(inputAll());
      if (!checkNonStop) dispatch(inputNonStop());
      if (!checkOne) dispatch(inputOne());
      if (!checkTwo) dispatch(inputTwo());
      if (!checkThree) dispatch(inputThree());
    }
  };

  if (inputCount < 4 && checkAll) {
    setTimeout(() => {
      dispatch(inputAll());
    }, 10);
  }
  if (inputCount === 4 && !checkAll) {
    setTimeout(() => {
      dispatch(inputAll());
    }, 10);
  }
  return (
    <div className={'sider-container'}>
      <span>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <form>
        <ul>
          <li>
            <input checked={checkAll} onChange={onClickAll} id="input_all" type="checkbox" />
            <label htmlFor="input_all" className={'label'}>
              Все
            </label>
          </li>
          <li>
            <input checked={checkNonStop} onChange={()=>dispatch(inputNonStop())} id="input_0" type="checkbox" />
            <label htmlFor="input_0" className={'label'}>
              Без пересадок
            </label>
          </li>
          <li>
            <input checked={checkOne} onChange={()=>dispatch(inputOne())} id="input_1" type="checkbox" />
            <label htmlFor="input_1" className={'label'}>
              1 пересадка
            </label>
          </li>
          <li>
            <input checked={checkTwo} onChange={()=>dispatch(inputTwo())} id="input_2" type="checkbox" />
            <label htmlFor="input_2" className={'label'}>
              2 пересадки
            </label>
          </li>
          <li>
            <input checked={checkThree} onChange={()=>dispatch(inputThree())} id="input_3" type="checkbox" />
            <label htmlFor="input_3" className={'label'}>
              3 пересадки
            </label>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Sider;
