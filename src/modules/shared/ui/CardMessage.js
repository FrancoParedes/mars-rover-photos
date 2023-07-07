import PropTypes from 'prop-types';

const CardMessage = ({ className, src, title, text }) => (
  <div
    className={`flex flex-col border
  place-content-center place-items-center p-10 
  text-gray-700 rounded-2xl text-center ${className}`}
  >
    <picture>
      <img src={src} width="100" alt="icon messagez" />
    </picture>
    <p className="mt-4">
      <b>{title}</b>
    </p>
    <p className="mt-4">{text}</p>
  </div>
);

CardMessage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
CardMessage.defaultProps = {
  className: '',
};

export default CardMessage;
