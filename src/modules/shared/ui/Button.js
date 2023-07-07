import * as Material from '@mui/material';
import PropTypes from 'prop-types';

const Button = ({ text, variant, type, size, className, ...props }) => (
  <Material.Button
    variant={variant}
    type={type}
    size={size}
    className={className}
    {...props}
  >
    {text}
  </Material.Button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  className: PropTypes.string,
};
Button.defaultProps = {
  className: ''
}

export default Button;
