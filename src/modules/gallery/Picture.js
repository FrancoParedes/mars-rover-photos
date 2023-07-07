import { useEffect, useState } from 'react';
import { string, number } from 'prop-types';
import { Skeleton } from '@mui/material';
import usePanel from '../shared/hooks/usePanel';
import Button from '../shared/ui/Button';

const Picture = ({ id, src }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { Panel, show, closePanel, setShow } = usePanel();

  const openExternal = () => {
    window.open(src, '_blank');
  };

  const openImage = () => {
    setShow(true);
  };

  const stopWhenFinishLoadImage = () => {
    const image = new Image();
    image.src = src;
    image.onload = () => setIsLoading(false);
  };

  useEffect(stopWhenFinishLoadImage, [src]);

  return (
    <>
      <div
        role="button"
        tabIndex="0"
        key={id}
        className={`w-full ${!isLoading && 'pb-[100%]'} bg-no-repeat bg-cover rounded-xl`}
        style={{ backgroundImage: `url(${src})` }}
        onClick={openImage}
      >
        {isLoading && (
          <Skeleton
            variant="rounded"
            animation="wave"
            className="rounded-xl w-full pb-[100%]"
          />
        )}
      </div>
      <Panel show={show} closePanel={closePanel} title={`#${id}`}>
        <picture>
          <img src={src} className="w-full rounded-xl" alt="test" />
        </picture>
        <Button
          className="!mt-4"
          variant="outlined"
          text="OPEN EXTERNAL"
          type="button"
          size="large"
          onClick={openExternal}
        />
      </Panel>
    </>
  );
};

Picture.propTypes = {
  id: number.isRequired,
  src: string.isRequired,
};

export default Picture;
