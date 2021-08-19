import { userLanguageKey } from '../../constants/localStorageConstants';
import { postAssignCoach, postDeassignCoach } from '../../api/unverifiedTests-fetch';

const changeButtonStyle = (id) => {
  const buttonAssign = document.getElementById('item-' + id + '-button');
  const selectNames = document.getElementById('item-' + id + '-select');

  if (selectNames !== null && buttonAssign !== null) {
    if (selectNames.value !== 'placeholder') {
      if (buttonAssign.classList.contains('buttonDeassign')) {
        buttonAssign.textContent = localStorage.getItem(userLanguageKey) !== 'rus' ? 'ASSIGN' : 'Назначить';
        selectNames.classList.remove('selectCoachNames--disabled');
        buttonAssign.classList.remove('buttonDeassign');
      } else {
        buttonAssign.textContent = localStorage.getItem(userLanguageKey) !== 'rus' ? 'DEASSIGN' : 'Отменить';
        selectNames.classList.add('selectCoachNames--disabled');
        buttonAssign.classList.add('buttonDeassign');
      }
    }
  }
};

const assignCoachTest = (testId, coachId) => {
  return coachId !== 'placeholder' ? postAssignCoach(testId, coachId) : Promise.reject('No coach');
};

const deassignCoachTest = (testId) => {
  postDeassignCoach(testId);
};

export { changeButtonStyle, assignCoachTest, deassignCoachTest };
