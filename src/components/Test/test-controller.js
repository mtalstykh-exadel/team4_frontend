export const testController = ({ tasks, testModule, questionID, answerID, domID }) => {
  tasks.map((el) => {
    if (el.id === questionID) {
      if (localStorage.getItem(testModule) !== null) {
        localStorage.setItem(
          testModule,
          JSON.stringify([
            { qID: questionID, aID: answerID, domID: domID },
            ...JSON.parse(localStorage.getItem(testModule))
          ])
        );

        const uniqueArray = JSON.parse(localStorage.getItem(testModule)).filter((el, index) => {
          const currentElement = JSON.stringify(el.qID);
          return index === JSON.parse(localStorage.getItem(testModule)).findIndex((obj) => {
            if (JSON.stringify(obj.qID) === currentElement) {
              return [{qID: questionID, aID: answerID, domID: domID}];
            }
          });
        });

        localStorage.setItem(testModule, JSON.stringify([ ...uniqueArray ]));

      } else {
        localStorage.setItem(
          testModule,
          JSON.stringify([{ qID: questionID, aID: answerID, domID: domID }])
        );
      }
    }
  });
};
