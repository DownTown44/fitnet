import PropTypes from 'prop-types';

const Select = (props) => {

  let options = props.optionList.map(optionValue => {
    return <option key={optionValue} value={optionValue}>{optionValue}</option>
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
