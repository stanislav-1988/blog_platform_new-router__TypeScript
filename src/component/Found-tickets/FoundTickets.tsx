import { useAppDispatch, useAppSelector } from '../hook/hook';
import { cheap, quick, optimal,addCountTicket } from '../../state/reducer';
import './foundTickets.scss';
import ContentTicket from '../Content-ticket/ContentTicket';

const FoundTickets: React.FC = () => {
  const { cheapBut, quickBut, optimalBut, continuation } = useAppSelector(state => state.toolkit);
  const dispatch = useAppDispatch();

  const loadTicket: string = continuation ? '' : 'loadTicket';
  const cheapClass: string = cheapBut ? 'button-selected-cheapClass' : 'cheapClass';
  const fastClass: string = quickBut ? 'button-selected-fastClass' : 'fastClass';
  const optimalClass: string = optimalBut ? 'button-selected-optimalClass' : 'optimalClass';
  return (
    <div className={'foundTickets-container'}>
      <div className={'button-container'}>
        <button onClick={()=>dispatch(cheap())} type="button" className={`${cheapClass}`}>
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button onClick={()=>dispatch(quick())} type="button" className={`${fastClass}`}>
          САМЫЙ БЫСТРЫЙ
        </button>
        <button onClick={()=>dispatch(optimal())} type="button" className={`${optimalClass}`}>
          ОПТИМАЛЬНЫЙ
        </button>
      </div>
      <div className={`${loadTicket}`}>
        <span className={'loader'} />
      </div>
      <ContentTicket />
      <div>
        <button onClick={()=>dispatch(addCountTicket())} className={'button-show-more'} type="button">
          Показать еще 5 билетов!
        </button>
      </div>
    </div>
  );
}

export default FoundTickets;
