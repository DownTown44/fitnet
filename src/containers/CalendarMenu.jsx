import CustomCalendar from '../components/CustomCalendar';

const CalendarMenu = (props) => {
  return (
    <div className="calendar-menu left">
      <CustomCalendar />
      <div>
        Opened calendar day
      </div>
    </div>
  );
}

export default CalendarMenu;
