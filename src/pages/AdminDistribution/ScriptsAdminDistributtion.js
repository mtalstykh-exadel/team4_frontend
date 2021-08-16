const assignTest = (id) => {
  const buttonAssign = document.getElementById('item-' + id + '-button');
  const selectNames = document.getElementById('item-' + id + '-select');
  const divSelect = document.querySelectorAll('.selectCoachNames')[id];

  if (selectNames.value !== 'placeholder') {
    buttonAssign.textContent = 'DEASSIGN';
    if (buttonAssign.classList.contains('buttonDeassign')) {
      buttonAssign.textContent = 'assign';
    }
    buttonAssign.classList.toggle('buttonDeassign');
    divSelect.classList.toggle('selectCoachNames--disabled');
  }
};

export { assignTest };
