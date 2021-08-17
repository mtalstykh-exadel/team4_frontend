import { postAssignCoach, postDeassignCoach } from '../../api/unverifiedTests-fetch';

const changeButtonStyle = (id) => {
  const buttonAssign = document.getElementById('item-' + id + '-button');
  const selectNames = document.getElementById('item-' + id + '-select');

  if (selectNames.value !== 'placeholder') {
    buttonAssign.textContent = 'DEASSIGN';
    if (buttonAssign.classList.contains('buttonDeassign')) {
      buttonAssign.textContent = 'assign';
    }
    buttonAssign.classList.toggle('buttonDeassign');
    selectNames.classList.toggle('selectCoachNames--disabled');
  }

};

const assignCoachTest = (testId, coachId) => {
  if (coachId !== 'placeholder') {
    postAssignCoach(testId, coachId);
  }
};

const deassignCoachTest = (testId) => {
  postDeassignCoach(testId);
};

export { changeButtonStyle, assignCoachTest, deassignCoachTest };
