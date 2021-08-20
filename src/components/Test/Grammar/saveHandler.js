import { saveListeningAndGrammar } from '../../../api/test-set';
import { changeArray } from '../SubmitModal/SubmitModalHandler';

// saveListeningAndGrammar

let requests = [];

const saveHandler = async (saveDataArray) => {
  const promise = await saveListeningAndGrammar(changeArray(saveDataArray));

  if (promise) {
    requests.push(promise);

    Promise.all(requests).then(() => {
        requests = [];
    });
  }
};

export { saveHandler };