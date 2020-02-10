import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { employeeService } from '../services';

class Employees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    employeeService.getAll().then(employees => this.setState({ employees }));
  }

  render() {
    const { employees } = this.state;
    return (
      <div>
        <h1>Hi !</h1>
        <p>You're logged in!!</p>
        <h3 className="mb-4">All employees list</h3>
        {employees ? (
          <>
            <div className="d-none d-md-block">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Salary</th>
                    <th>Joining date</th>
                    <th>Department</th>
                    <th width="5%" />
                  </tr>
                </thead>
                <tbody>
                  {employees.map(employee =>
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{`AUD ${employee.salary}`}</td>
                      <td>{moment(employee.joinDate).format('D/M/Y')}</td>
                      <td>{employee.dept}</td>
                      <td>
                        <Link to={`/employee/${employee.id}`} className="btn btn-link" >Edit</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-md-none">
              {employees.map(employee =>
                <div key={employee.id} className="card bg-light mb-2">
                  <div className="card-body">
                    <Link to={`/employee/${employee.id}`} className="btn btn-sm btn-primary float-right" >Edit</Link>
                    <small>ID: {employee.id}</small>
                    <h5>{employee.firstName} {employee.lastName}</h5>
                    <p>
                      Salary: {employee.salary}<br />
                      Join date: {employee.joinDate}<br />
                      Department: {employee.dept}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : 'Loading...'}
      </div>
    );
  }
}

export default Employees;
