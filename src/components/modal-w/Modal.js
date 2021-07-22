import React from "react";
import './Modal.scss';
import {Modal} from '@material-ui/core';
import PropTypes from 'prop-types';


// const SimpleModal = ({children}) => {
const SimpleModal = ({open, children}) => {
  const [opened, setClose] = React.useState(open);

  const handleModal = () => {
    setClose(false);
  };
  return (
    <>
      {/* <button type="button" onClick={handleModal}>
        Open Modal
      </button> */}
      <Modal
        open={opened}
        onClose={handleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className='modalMain'>
        <div className='modal'>
          {children}
        </div>
      </Modal>
    </>
  );
};

SimpleModal.propTypes =
  {
    children: PropTypes.array,
    open: PropTypes.bool
  };

export default SimpleModal;
