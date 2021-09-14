import React from 'react';
import PropTypes from 'prop-types';

import NavButton from '../UI/NavButton';
import Text from '../UI/Text';
import UserPicture from '../../assets/userImages/userPicture.png'

// TODO: with useEffect check token and set state accordingly 
// (if the user is signed in then switch it to true)

const AuthNav = (props) => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  return (
    <nav className="side-drawer">
      <NavButton additionalClass="side-drawer__back" icon="arrow_back" onClick={() => props.closeSideDrawer()}/>
      {props.isAuth ?
        <>
          <div className="side-drawer__user">
            <img src={UserPicture} />
            <Text>{`${userData.lastName} ${userData.firstName}`}</Text>
          </div>
          <NavButton icon="person" onClick={() => props.closeSideDrawer()}>Profilom</NavButton>
          <NavButton to="/events" icon="dashboard" onClick={() => props.closeSideDrawer()}>Események</NavButton>
          <NavButton to="/groups" icon="face" onClick={() => props.closeSideDrawer()}>Csoportok</NavButton>
          <NavButton to="/facilities" icon="other_houses" onClick={() => props.closeSideDrawer()}>Sportlétesítmények</NavButton>
          <NavButton to="/calendar" icon="event_note" onClick={() => props.closeSideDrawer()}>Naptár</NavButton>
          <NavButton icon="bookmark" onClick={() => props.closeSideDrawer()}>Mentett események</NavButton>
          <NavButton icon="info" onClick={() => props.closeSideDrawer()}>Kapcsolat</NavButton>
          <NavButton icon="help_outline" onClick={() => props.closeSideDrawer()}>GYIK</NavButton>
          <NavButton 
            icon="logout" 
            onClick={() => props.onLogout()}
          >Kijelentkezés</NavButton>
        </> :
        <>
          <NavButton to="/events" icon="dashboard" onClick={() => props.closeSideDrawer()}>Események</NavButton>
          <NavButton to="/login" icon="login" onClick={() => props.closeSideDrawer()}>Bejelentkezés</NavButton>
          <NavButton to="/signup" icon="login" onClick={() => props.closeSideDrawer()}>Regisztráció</NavButton>
        </>
      }
    </nav>
  );
}


AuthNav.propTypes = {
  isAuth: PropTypes.bool.isRequired
}

export default AuthNav;
