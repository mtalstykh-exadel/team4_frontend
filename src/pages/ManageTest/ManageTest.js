import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { ManageModule } from '../../components';
import Layout from '../../components/Layout/Layout';
import { requestListeningTopic, requestQuestion, requestToAddNewQuestion } from '../../store/actions/coachActions';
import * as queryString from 'querystring';

export const ManageTest = () => {

  const editedQuestion = useSelector((state) => state.coach.editedQuestion);
  const question = useSelector((state) => state.coach.question);
  const history = useHistory();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.jwt.role);

  const location = history.location.pathname;
  const parsed = queryString.parse(history.location.search.substr(1));

  const sendQuestionToEditOrAdd = (moduleData) => {
    // debugger;
    // if (location === '/edit-test-modules') {
    //   dispatch(editQuestion(moduleData));
    // }
    if (location === '/add-test-modules') {
      dispatch(requestToAddNewQuestion(moduleData));
    }
  };

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1));
    if (editedQuestion && +parsed.id === editedQuestion.id) {
      if (parsed.module === 'Listening') {
        dispatch(requestListeningTopic(parsed.id));
      } else {
        dispatch(requestQuestion(parsed.id));
      }
    }
  }, [editedQuestion]);

  useEffect(() => {
    if (location === '/edit-test-modules' || editedQuestion) {
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
      {location === '/edit-test-modules' && !!question && <ManageModule level={question.level} module={parsed.module}
        sendQuestionToEditOrAdd={sendQuestionToEditOrAdd} />}
      {location === '/add-test-modules' && <ManageModule level='' module='' sendQuestionToEditOrAdd={sendQuestionToEditOrAdd} />}
    </Layout>
  );
};
