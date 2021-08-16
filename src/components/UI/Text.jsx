import PropTypes from 'prop-types';

const Text = (props) => {
  let HtmlTag = props.htmlTag;
  return (
    <HtmlTag className={props.className}>{props.children}</HtmlTag>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  htmlTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'])
};

Text.defaultProps = {
  htmlTag: 'p'
};

export default Text;
