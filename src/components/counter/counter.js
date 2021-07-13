import React from 'react';
import { increment, decrement, reset } from '../../store/actions/counterActions';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const counter = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div className = "App">
      <div>{counter}</div>
        <button onClick = {()=>{dispatch(increment());}}>INCREMENT BY 1</button>
        <button onClick = {()=>{dispatch(decrement());}}>DECREMENT BY 1</button>
        <button onClick = {()=>{dispatch(reset());}}>RESET</button>
    </div>
  );
}

export default Counter;