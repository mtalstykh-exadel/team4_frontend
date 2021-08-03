import { Link, useLocation } from 'react-router-dom';
import { React } from 'react';

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

import { Trans } from '@lingui/macro';

const UserNavigation = (props) => {
  const location = useLocation();
  const role = useSelector((state) => state.jwt.role);

  return (
    <>
      {role === 'ROLE_HR' && (
        <>
          <Button
            disableElevation
            className={`${location.pathname === '/employees' ? 'bold' : null} ${
              props.roleBtns
            } font-primary`}
            component={Link}
            to='/employees'
          >
            <Trans>Employees</Trans>
          </Button>
        </>
      )}
      {role === 'ROLE_COACH' && (
        <>
          <Button
            disableElevation
            className={`${
              location.pathname === '/tests-for-verification' ? 'bold' : null
            } ${props.roleBtns} font-primary`}
            component={Link}
            to='/tests-for-verification'
          >
            <Trans>Tests for verification</Trans>
          </Button>
          <Button
            disableElevation
            className={`${
              location.pathname === '/edit-tests' ? 'bold' : null
            } ${props.roleBtns} font-primary`}
            component={Link}
            to='/edit-tests'
          >
            <Trans>Edit tests</Trans>
          </Button>
        </>
      )}
      {role === 'ROLE_ADMIN' && (
        <>
          <Button
            disableElevation
            className={`${
              location.pathname === '/admin-distribution' ? 'bold' : null
            } ${props.roleBtns} font-primary`}
            component={Link}
            to='/admin-distribution'
          >
            <Trans>Distribution of tests</Trans>
          </Button>
        </>
      )}
    </>
  );
};

UserNavigation.propTypes = {
  roleBtns: PropTypes.string,
};

export default UserNavigation;
