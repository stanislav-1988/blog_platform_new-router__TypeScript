import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {  UserSessionStorageType, userActionType } from '../../type/type';
import { useAppSelector } from '../../hook/hook';

import './header.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { authorizationData } = useAppSelector(state => state)

  let user: UserSessionStorageType;
  const userJson = sessionStorage.getItem('user');

  if (userJson !== null && !authorizationData) {
   user = JSON.parse(userJson);
   dispatch({type: userActionType.authorizationData, payload: user});
  }
   const logOut = () => {
     sessionStorage.clear();
     dispatch({type: userActionType.authorizationData, payload: ''});
   };

 if (authorizationData) {
   const {username } = authorizationData;
   let image = authorizationData.image;
   if (!image) {
    image = "https://static.productionready.io/images/smiley-cyrus.jpg"
   }
   return (
     <div>
       <div className={'header-container'}>
         <Link to="/articl">
           <h3>Realworld Blog</h3>
         </Link>
         <div className={'create-article'}>
           <Link to="/new-article">Create article</Link>
         </div>
         <Link to="/profile" className={'header_name-user'}>
           <h6>{`${username}`}</h6>
           <img src={image} alt="alt" />
         </Link>
         <div className={'log-out'}>
           <Link to="/sign-in" onClick={logOut}>
             Log Out
           </Link>
         </div>
       </div>
       <Outlet />
     </div>
   );
}

return (
  <div>
    <div className={'header-container'}>
      <Link className={'realworld-blog'} to="/articl">
        <h3>Realworld Blog</h3>
      </Link>
      <div className={'sign-in'}>
        <Link to="/sign-in">Sign In</Link>
      </div>
      <div className={'sign-up'}>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
    <Outlet />
  </div>
);
}

export default Header;
