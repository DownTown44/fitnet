import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';

const CalendarMenu = (props) => {
  return (
    <div className="calendar-menu">
      <CustomCalendar />
      <div>
        Opened calendar day
      </div>
    </div>
  );
}

export default CalendarMenu;
