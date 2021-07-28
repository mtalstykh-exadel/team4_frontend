import {Modal} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";


const AssignTest = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const name = 'Ivanov Ivan';
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className='modal'>
        <div className='modal-content' style={{width: "450px", height: "278px"}}>
          <div style={{fontSize: "18px", paddingTop: "20px", paddingLeft: "30px"}}>You want to assign a test for {name}
            <div style={{paddingTop: "10px"}}>Select the test level:</div>
          </div>
          <div style={{fontSize: "16px", paddingLeft: "30px"}}>
            <select name="Select the test level:" size="1">
              <option value="A1">Beginner(A1)</option>
              <option value="A2">Elementary(A2)</option>
              <option value="B1">Intermediate(B1)</option>
              <option value="B2">Upper Intermediate(B2)</option>
              <option value="B2">Upper Intermediate(B2)</option>
              <option value="C1">Advanced(C1)</option>
              <option value="C2">Proficiency(C2)</option>
            </select>
          </div>
          <div style={{fontSize: "18px", paddingTop: "20px", paddingLeft: "30px"}}>Test deadline:
            <div><input type="date" id="day"/></div>
          </div>
          <div style={{fontSize: "18px", paddingTop: "20px", paddingLeft: "30px"}}>
            <div>Priority:</div>
            <select name="Priority:" size="1">
              <option value="low">Low</option>
              <option value="hight">Hight</option>
            </select>
          </div>
          <div style={{paddingLeft: "42%"}}><Button
            variant="contained"
            color="primary"
            size='small'
          >
            Assign
          </Button>
          </div>
        </div>
      </Modal>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        size='small'
      >
        Try
        Again
      < /Button>
    </>
  );
};

export default AssignTest;
