import PropTypes from 'prop-types';

const Select = (props) => {

  let options = props.optionList.map(option => {
    if (option.value == props.current) {
      return  <option key={option.value} selected value={option.value}>{option.text}</option>
    }
    return <option key={option.value} value={option.value}>{option.text}</option>
  });

  return (
    <>
      <label>{props.children}</label>
      <select onChange={props.onChange}>
        {options}
      </select>
    </>
  );
};

Select.propTypes = {
  children: PropTypes.string.isRequired,
  optionList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  current: PropTypes.isRequired
};

export default Select;
