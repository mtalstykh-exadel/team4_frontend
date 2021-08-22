import { saveListeningAndGrammar, saveEssay } from '../../api/test-set';
import { changeArray } from './SubmitModal/SubmitModalHandler';
let checkRequest = false;
const saveTestHandler = ({grammar = [], listening = []}) => {
  if ( checkRequest === false) {
    saveListeningAndGrammar([
        ...changeArray(grammar),
        ...changeArray(listening)
    ]);    
    checkRequest = true;
    return ;
  }
  checkRequest = false;
};

const saveEssayHandler = ({essay = ''}) => {
  if ( checkRequest === false) {
    saveEssay(essay);
    checkRequest = true;
    return ;
  }
  checkRequest = false;
};

export { saveTestHandler, saveEssayHandler };
