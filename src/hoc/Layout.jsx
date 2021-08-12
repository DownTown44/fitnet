import Header from '../components/Header/Header';
import CalendarMenu from '../containers/CalendarMenu/CalendarMenu';
import UserControls from '../containers/UserControls/UserControls';
// TODO: Position with grid
// TODO: Pass main content as children
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
