import React from 'react';
import { authenticationService } from '../services';
import {history} from "../helpers";
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser } = this.state;
    return (
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand px-sm-3" to={'/'}>Employee Portal</Link>
          {currentUser && (
            <div className="navbar-nav">
              <button type="button" onClick={this.logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export {Header};
