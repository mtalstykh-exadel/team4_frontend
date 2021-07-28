import { Link, useLocation } from 'react-router-dom';
import { React } from "react";

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from "@material-ui/core";

import { Trans } from "@lingui/macro";

const UserNavigation = (props) => {
  const location = useLocation();
  const role = useSelector((state) => state.jwt.role);
  const darktheme = useSelector((state) => state.darktheme);

  return (
    <div className={`${darktheme ? 'theme-dark' : 'theme-light'}`}>
      {role === 'ROLE_HR' && <>
        <Button
          disableElevation
          className={`${location.pathname === '/employees' ? 'bold' : null} ${props.roleBtns} font-primary`}
          component={Link}
          to='/employees'>
          <Trans>Employees</Trans>
        </Button>
      </>}
      {role === 'ROLE_COACH' && <>
        <Button
          disableElevation
          className={`${location.pathname === '/verifytests' ? 'bold' : null} ${props.roleBtns} font-primary`}
          component={Link}
          to='/verifytests'>
          <Trans>Tests for verification</Trans>
        </Button>
        <Button
          disableElevation
          className={`${location.pathname === '/edittests' ? 'bold' : null} ${props.roleBtns} font-primary`}
          component={Link}
          to='/edittests'>
          <Trans>Edit tests</Trans>
        </Button>
      </>}
      {role === 'ROLE_ADMIN' && <>
        <Button
          disableElevation
          className={`${location.pathname === '/statistics' ? 'bold' : null} ${props.roleBtns} font-primary`}
          component={Link}
          to='/statistics'>
          <Trans>Statistics</Trans>
        </Button>
        <Button
          disableElevation
          className={`${location.pathname === '/distibutetests' ? 'bold' : null} ${props.roleBtns} font-primary`}
          component={Link}
          to='/distibutetests'>
          <Trans>Distribution of tests</Trans>
        </Button>
      </>}
    </div>
  );
};

UserNavigation.propTypes = {
  roleBtns: PropTypes.string
};

export default UserNavigation;
