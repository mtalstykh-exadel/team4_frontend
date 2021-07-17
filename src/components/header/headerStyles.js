import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  logoText: {
    maxWidth: '160px',
    marginLeft: '10%'
  },
  logo: {
    maxWidth: '160px',
    minWidth: '100px',
  },
  toolbar: {
    justifyContent: 'space-around',
    ['@media (max-width:1024px)']: {
      justifyContent: 'space-between',
    }
  },
  sideLeft: {
    display: 'flex'
  },
  sideRight: {
    display: 'flex'
  },
  triangle: {
    fontSize: 15
  },
  modalBtns: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  bold: {
    fontWeight: 'bold'
  },
  roleBtns: {
    padding: '20px'
  },
  notifTest: {
    padding: '15px 0 0 10px',
  },
  notifEmpty: {
    display: 'inline-block',
    padding: '10px 0 50px 20px'
  },
  closeButton: {
    position: 'relative',
    float: 'right',
  },
  takeTestBtn: {
    width: '30%',
    height: '25px',
    textTransform: 'none'
  },
  seemoreBtn: {
    float: 'right',
    marginRight: '10px',
    textTransform: 'none'
  },
  list: {
    padding: '15px',
    width: '200px'
  },
  drawer: {
    padding: '20px 40px 20px 10px'
  },
  drawerIcons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default useStyles;
