import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import CalendarMenu from '../containers/CalendarMenu';
import UserControls from '../containers/UserControls';

const Layout = (props) => {
  return (
    <div className="layout">
      <Header isAuth={props.isAuth} onLogout={props.onLogout}/>
      {props.isShown && <CalendarMenu/>}
      {props.children}
      {props.isShown && <UserControls/>}
    </div>
  );
}

Layout.propTypes = {
  isShown: PropTypes.bool,
  isAuth: PropTypes.bool.isRequired
}

Layout.defaultProps = {
  isShown: true
}

export default Layout;
