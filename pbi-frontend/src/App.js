import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
   
    <Router>
      <Switch>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <Route path='/' component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
