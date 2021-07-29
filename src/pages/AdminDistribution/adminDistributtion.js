const AssignTest = (id) => {
  const buttonAssign = document.getElementById(id + "-button"); 
  const selectNames = document.getElementById(id + "-select");
  if (selectNames.value !== 'placeholder' ) {
    buttonAssign.textContent = 'DEASSIGN';
    if (buttonAssign.classList.contains("buttonDeassign")) {
      buttonAssign.textContent = 'assign';
    }
    buttonAssign.classList.toggle('buttonDeassign');
  }
};

export { AssignTest };
