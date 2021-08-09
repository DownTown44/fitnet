import PropTypes from 'prop-types';

let Select = (props) => {

  let options = props.optionList.map(o => {
    return <option key={o} value={o}>{o}</option>
  });

  return (
    <>
      <label>{props.children}</label>
      <select>
        {options}
      </select>
    </>
  );
};

Select.propTypes = {
  children: PropTypes.string.isRequired,
  optionList: PropTypes.array.isRequired
};

export default Select;
