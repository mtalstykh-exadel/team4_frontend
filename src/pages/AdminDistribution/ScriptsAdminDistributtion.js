const assignTest = (id) => {
  const buttonAssign = document.getElementById('item-' + id + '-button');
  const selectNames = document.getElementById('item-' + id + '-select');
  console.log(selectNames.value);
  // if (selectNames !== null) {
  if (selectNames.value !== 'placeholder') {
    buttonAssign.textContent = 'DEASSIGN';
    if (buttonAssign.classList.contains('buttonDeassign')) {
      buttonAssign.textContent = 'assign';
    }
    buttonAssign.classList.toggle('buttonDeassign');
    selectNames.classList.toggle('selectCoachNames--disabled');
  }
  // }

};

export { assignTest };
