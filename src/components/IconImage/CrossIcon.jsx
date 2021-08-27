import PropTypes from 'prop-types';
import { GiCancel } from 'react-icons/gi';

const CrossIcon = (props) => {
  return (
    <GiCancel className="cross-button" onClick={props.onClick}/>
  );
};

CrossIcon.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CrossIcon;
