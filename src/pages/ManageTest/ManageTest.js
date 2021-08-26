import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { ManageModule } from '@components/index';
import Layout from '@components/Layout/Layout';
import { addListeningQuestion, editListeningQuestion, requestListeningTopic, requestQuestion } from '@actions/coachActions';
import * as queryString from 'querystring';
import { addNewQuestion, sendEditedQuestion } from '@api/questions-requests';

export const ManageTest = () => {

  const question = useSelector((state) => state.coach.question);
  const history = useHistory();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.jwt.role);

  const location = history.location.pathname;
  const parsed = queryString.parse(history.location.search.substr(1));

  const sendQuestionToEditOrAdd = (moduleData, module, audioFile) => {
    if (location === '/edit-test-modules') {
      if (module === 'Listening') {
        dispatch(editListeningQuestion(audioFile, moduleData));
      } else {
        sendEditedQuestion(moduleData);
      }
    }
    if (location === '/add-test-modules') {
      if (module === 'Listening') {
        dispatch(addListeningQuestion(audioFile, moduleData));
      } else {
        addNewQuestion(moduleData);
      }
    }
  };

  useEffect(() => {
    if (location === '/edit-test-modules') {
      if (parsed.module === 'Listening') {
        dispatch(requestListeningTopic(parsed.id));
      } else {
        dispatch(requestQuestion(parsed.id));
      }
    }
  }, []);
  if (role !== 'ROLE_COACH') return <Redirect to='/' />;

  return (
    <Layout>
      {location === '/edit-test-modules' && !!question && <ManageModule dataType={parsed.status === 'UNARCHIVED' ? false : true}
        sendQuestionToEditOrAdd={sendQuestionToEditOrAdd} />}
      {location === '/add-test-modules' && <ManageModule sendQuestionToEditOrAdd={sendQuestionToEditOrAdd} />}
    </Layout>
  );
};
