import { useAppDispatch, useAppSelector } from '../hook/hook';
import { searchArrContinuation, searchArrTicket } from "../../state/reducer";
import { TicketType } from '../type/type';
import './contentTicket.scss';
import Loader from '../Loader/Loader';
import Ticket from "../Ticket";
import OfError from '../Error/Error';
import Service from "../service";

const ContentTicket: React.FC = () => {
  const service = new Service();
  const dispatch = useAppDispatch();
  const {
    checkNonStop,
    checkOne,
    checkTwo,
    checkThree,
    cheapBut,
    quickBut,
    optimalBut,
    arrTicket,
    countTicket,
    errors,
    keySearch,
    continuation,
  } = useAppSelector(state => state.toolkit);

  const gettingTickets = () => {
    if (keySearch) {
      service.getTickets(keySearch).then(
        (el) => {
          dispatch(searchArrTicket(el.tickets))
          dispatch(searchArrContinuation(el.stop))
        },
        () => {
          gettingTickets();
        }
      );
    }
  };
  if (!continuation) {
    gettingTickets();
  }
  let displayableArray: TicketType[] = [];

  if (checkNonStop) {
    const array = arrTicket.filter((el) => {
      if (el.segments[0].stops.length === 0) {
        return true;
      }
      return false;
    });
    displayableArray = [...displayableArray, ...array];
  }
  if (checkOne) {
    const array = arrTicket.filter((el) => {
      if (el.segments[0].stops.length === 1) {
        return true;
      }
      return false;
    });
    displayableArray = [...displayableArray, ...array];
  }
  if (checkTwo) {
    const array = arrTicket.filter((el) => {
      if (el.segments[0].stops.length === 2) {
        return true;
      }
      return false;
    });
    displayableArray = [...displayableArray, ...array];
  }
  if (checkThree) {
    const array = arrTicket.filter((el) => {
      if (el.segments[0].stops.length === 3) {
        return true;
      }
      return false;
    });
    displayableArray = [...displayableArray, ...array];
  }
  if (cheapBut) {
    displayableArray.sort((a, b) => {
      return a.price - b.price;
    });
  }
  if (quickBut) {
    displayableArray.sort((a, b) => {
      return a.segments[0].duration - b.segments[0].duration;
    });
  }
  
  if (optimalBut) {
    const array = displayableArray.sort((a, b) => {
      return a.price - b.price;
    });
    array.filter((el) => {
      if (el.segments[0].stops.length === 0) {
        return true;
      }
      return false;
    });
    displayableArray = array.slice(0, 25);
    displayableArray.sort((a, b) => {
      return a.segments[0].duration - b.segments[0].duration;
    });
  }

  if (errors) {
    return <OfError />;
  }

  if (!arrTicket.length || !keySearch) {
    return <Loader />;
  }

  const newArr: TicketType[] = [];
  displayableArray.every((element) => {
    if (newArr.length < countTicket) {
      newArr.push(element);
      return true;
    }
    return false;
  });

  if (newArr.length === 0) {
    return (
      <div id="no-flights" className={'no-flights'}>
        <span>Рейсов, подходящих под заданные фильтры, не найдено!!!</span>
      </div>
    );
  }

  let IdTicket: number = 0;
  const item = newArr.map((el) => {
    IdTicket += 1;
    
    return (
      <div key={IdTicket}>
        <Ticket {...el} />
      </div>
    );
  });
  return <div>{item}</div>;
}

export default ContentTicket;
