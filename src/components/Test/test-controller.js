export const testController = ({ tasks, questionID, answerID, domID }) => {
  tasks.map((el) => {
    if (el.id === questionID) {
      if (localStorage.getItem('grammar') !== null) {
        localStorage.setItem(
          'grammar',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('grammar')), { qID: questionID, aID: answerID, domID: domID },
          ])
        );
      }
    }
  });
};
