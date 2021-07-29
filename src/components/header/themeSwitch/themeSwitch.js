import { React } from 'react';
import { useDispatch ,useSelector } from 'react-redux';

import { Switch } from '@material-ui/core';

import { themeChange } from '../../../store/actions/themeActions';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const darktheme = theme === 'dark' ? true : false;
  const newtheme = darktheme ? 'light' : 'dark';

  return (
    <Switch
      size='small'
      checked={Boolean(darktheme)}
      onChange={() => {dispatch(themeChange(newtheme));}}/>);
};

export default ThemeSwitch;
