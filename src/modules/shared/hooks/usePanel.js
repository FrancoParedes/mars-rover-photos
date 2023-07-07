import { Drawer, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { bool, string, node, func } from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

const Panel = React.memo(
  ({ children, title, show, closePanel, side, empty, className }) => (
    <Drawer anchor={side} open={show} onClose={closePanel}>
      <div className={className}>
        {!empty && (
          <div className=" flex flex-col p-8">
            <div className="flex place-content-between place-items-center mb-8">
              <h1 className="text-lg font-semibold">{title}</h1>
              <IconButton onClick={closePanel}>
                <CloseIcon />
              </IconButton>
            </div>
            {children}
          </div>
        )}
        {empty && children}
      </div>
    </Drawer>
  )
);
Panel.propTypes = {
  children: node.isRequired,
  title: string.isRequired,
  show: bool.isRequired,
  closePanel: func.isRequired,
  side: string,
  empty: bool,
  className: string,
};

Panel.defaultProps = {
  side: 'right',
  empty: false,
  className: 'w-screen md:w-auto md:min-w-[500px] md:max-w-[500px]',
};

const usePanel = () => {
  const [show, setShow] = useState(false);

  const closePanel = () => {
    setShow(false);
  };

  return {
    show,
    setShow,
    closePanel,
    Panel,
  };
};

export default usePanel;
