import React from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from './helpers';
import { PrivateRoute, Header } from './components';
import Employees from './routes/Employees';
import EditEmployee from './routes/EditEmployee';
import Login from './routes/Login';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <div className="container">
            <div className="mt-3 mb-5">
              <PrivateRoute exact path="/employee/:id" component={EditEmployee} />
              <PrivateRoute exact path="/" component={Employees} />
              <Route path="/login" component={Login} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
