import { saveListeningAndGrammar, saveEssay } from '../../api/test-set';
import { changeArray } from './SubmitModal/SubmitModalHandler';
let checkRequest = false;

const saveTestHandler = async ({grammar = [], listening = []}) => {
  if ( checkRequest === false) {
    await saveListeningAndGrammar([
        ...changeArray(grammar),
        ...changeArray(listening)
    ])
    .then(() => checkRequest = true);
    return ;
  }
  checkRequest = false;
};

const saveEssayHandler = ({essay = ''}) => {
  if ( checkRequest === false) {
    saveEssay(essay)
    .then(() => checkRequest = true);
    return ;
  }
  checkRequest = false;
};

export { saveTestHandler, saveEssayHandler };
