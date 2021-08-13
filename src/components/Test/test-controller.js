export const testController = ({ tasks, testModule, questionID, answerID, domID }) => {
  tasks.map((el) => {
    if (el.id === questionID) {
      if (localStorage.getItem(testModule) !== null) {
        const storage = JSON.parse(localStorage.getItem(testModule));
        localStorage.setItem(
          testModule,
          JSON.stringify([
            { qID: questionID, aID: answerID, domID: domID },
            ...storage
          ])
        );

        const uniqueArray = storage.filter((current, index) => {
          return index === storage.findIndex((obj) => {
            if (JSON.stringify(obj.qID) === JSON.stringify(current.qID)) {
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
