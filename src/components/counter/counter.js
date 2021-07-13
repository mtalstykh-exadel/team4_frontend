import React from 'react';
import { increment, decrement, reset } from '../../store/actions/counterActions';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const Counter = () => {
	const useStyles = makeStyles((theme) => ({
		root: {
			'& > *': {
				margin: theme.spacing(1),
			},
		}, testButtons: {
			'&': {
				margin: 40,
			}
		},
	}));
	const classes = useStyles();

	const counter = useSelector((state) => state.counter);
	const dispatch = useDispatch();

	return (
		<div className="App">
			<div>{counter}</div>
			<div>
				<button onClick={() => { dispatch(increment()); }}>INCREMENT BY 1</button>
			</div>
			<div>
				<button onClick={() => { dispatch(decrement()); }}>DECREMENT BY 1</button>
			</div>
			<button onClick={() => { dispatch(reset()); }}>RESET</button>
			<Button variant="contained" color="primary" disableElevation className={classes.testButtons}>
				<Link to='/profile'>Profile</Link>
			</Button>
		</div>
	);
};

export default Counter;
