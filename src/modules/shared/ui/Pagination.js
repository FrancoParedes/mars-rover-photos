import { string, bool, func } from 'prop-types';
import Button from './Button';

const Pagination = ({ current, prevAction, nextAction, prevDisabled, nextDisabled }) => (
  <div className="flex place-content-between  place-items-center mt-4 mb-4">
    <Button
      variant="text"
      text="< PREV"
      type="large"
      disabled={prevDisabled}
      onClick={prevAction}
      size="large"
    />
    <div
      className="flex place-items-center place-content-center
            rounded-full text-white bg-gray-700
             w-[30px] h-[30px] text-center"
    >
      {current}
    </div>
    <Button
      variant="text"
      text="NEXT >"
      type="large"
      disabled={nextDisabled}
      onClick={nextAction}
      size="large"
    />
  </div>
);

Pagination.propTypes = {
  current: string.isRequired,
  prevAction: func.isRequired,
  nextAction: func.isRequired,
  prevDisabled: bool.isRequired,
  nextDisabled: bool.isRequired,
};

export default Pagination;
