import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import CalendarMenu from '../containers/CalendarMenu';
import UserControls from '../containers/UserControls';

const Layout = (props) => {
  return (
    <div className="layout">
      <Header/>
      {props.isShown && <CalendarMenu/>}
      {props.children}
      {props.isShown && <UserControls/>}
    </div>
  );
}

Layout.propTypes = {
  isShown: PropTypes.bool
}

Layout.defaultProps = {
  isShown: true
}

export default Layout;
