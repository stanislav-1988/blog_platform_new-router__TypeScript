import { useAppDispatch } from '../hook/hook';
import'./app.scss';
import Header from '../Header';
import Sider from '../Sider';
import FoundTickets from '../Found-tickets';
import { useEffect } from 'react';
import { swapKey, error } from "../../state/reducer";
import Service from '../service';

const service = new Service();


const App: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const searchId = () => {
      service.searchId().then(
      (el) => {
        dispatch(swapKey(el.searchId));
      },
      () => {
        dispatch(error());
      }
    );
    }

   useEffect(() => {
    searchId();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
     <div className={'body'}>
        <Header />
       <div className={'main'}>
         <Sider />
         <FoundTickets />
       </div> 
     </div>
   );
 }
 
 export default App;