import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { ManageModule } from '../../components';
import Layout from '../../components/Layout/Layout';
import { requestQuestion } from '../../store/actions/coachActions';
import * as queryString from 'querystring';

export const ManageTest = () => {
  // const queryString = require('query-string');
  const question = useSelector((state) => state.coach.question);
  const history = useHistory();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.jwt.role);

  const location = history.location.pathname;

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1));
    if (location === '/edit-test-modules') {
      dispatch(requestQuestion(parsed.id));
    }

  }, []);

  if (role !== 'ROLE_COACH') return <Redirect to='/' />;

  return (
    <Layout>
      {location === '/edit-test-modules' && !!question && <ManageModule level={question.level} module={question.module} />}
      {location === '/add-test-modules' && <ManageModule level='' module='' />}
    </Layout>
  );
};
