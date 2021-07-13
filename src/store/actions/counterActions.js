import { INCREMENT, DECREMENT, RESET } from '../actions/actionTypes';

export const increment = () => ({
	type: INCREMENT
});
export const decrement = () => ({
	type: DECREMENT
});
export const reset = () => ({
	type: RESET
});
