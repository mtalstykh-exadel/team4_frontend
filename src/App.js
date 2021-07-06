import './App.css';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link to='/login'>Login</Link>
      <Switch>
        <Route path='/login' render={() => <Login/>}/>
      </Switch>
    </div>
  );
}
//Позже будет вынесен в отдельный компонент 
const Login = () => {
  return <div>
    Login
  </div>
}

const AppContainer = () => {
  return <BrowserRouter>
    <App />
  </BrowserRouter>
}

export default AppContainer;
