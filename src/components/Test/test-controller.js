export const testController = ({ tasks, testModule, questionID, answerID, domID }) => {
  tasks.map((el) => {
    if (el.id === questionID) {
      if (localStorage.getItem(testModule) !== null) {
        localStorage.setItem(
          testModule,
          JSON.stringify([
            ...JSON.parse(localStorage.getItem(testModule)), { qID: questionID, aID: answerID, domID: domID },
          ])
        );
      } else {
        localStorage.setItem(testModule, JSON.stringify([{ qID: questionID, aID: answerID, domID: domID }]));
      }
    }
  });
};
