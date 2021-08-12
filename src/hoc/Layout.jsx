import Header from '../components/Header';
import CalendarMenu from '../containers/CalendarMenu';
import UserControls from '../containers/UserControls';

const Layout = (props) => {
  return (
    <div className="layout">
      <Header/>
      <CalendarMenu/>
      {props.children}
      <UserControls/>
    </div>
  );
}

export default Layout;
