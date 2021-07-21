import React from "react";
import './Modal.scss';
import {Modal} from '@material-ui/core';
import PropTypes from 'prop-types';

const SimpleModal = ({children}) => {
  const [open, setOpen] = React.useState(false);

  const handleModal = () => {
    setOpen(() => {
      return open === false ? true : false;
    });
  };
  return (
    <>
      <button type="button" onClick={handleModal}>
        Open Modal
      </button>
      <Modal
        open={open}
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
SimpleModal.propTypes = {
  children: PropTypes.array,
};
export default SimpleModal;
