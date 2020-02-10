import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { employeeService } from '../services';

class EditEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: []
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params && match.params.id) {
      employeeService.get(match.params.id).then(employee => this.setState({employee}));
    }
  }

  render() {
    const { employee } = this.state;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-31">
          <h2 className="mb-4">Edit employee details</h2>
          {employee && employee.id ? (
            <Formik
              initialValues={employee}
              validationSchema={Yup.object().shape({
                id: Yup.number().required('ID is required'),
                firstName: Yup.string().required('First name is required'),
                lastName: Yup.string().required('Last name is required'),
              })}
              onSubmit={({ id, firstName, lastName, salary, dept }, { setStatus, setSubmitting }) => {
                setStatus();
                employeeService.update(employee.id, {
                  id,
                  firstName,
                  lastName,
                  salary,
                  dept
                })
                  .then(
                    user => {
                      const { from } = this.props.location.state || { from: { pathname: "/" } };
                      this.props.history.push(from);
                    },
                    error => {
                      setSubmitting(false);
                      setStatus(error);
                    }
                  );
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  {status && <div className={'alert alert-danger'}>{status}</div>}
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="id">Employee ID</label>
                        <Field name="id" type="number" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
                        <ErrorMessage name="id" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="salary">Salary</label>
                        <Field name="salary" type="number" className={'form-control' + (errors.salary && touched.salary ? ' is-invalid' : '')} />
                        <ErrorMessage name="salary" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="dept">Department</label>
                        <Field name="dept" type="text" className={'form-control' + (errors.dept && touched.dept ? ' is-invalid' : '')} />
                        <ErrorMessage name="dept" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-3 pt-3 border-top">
                    <button type="submit" className={`btn btn-primary ${isSubmitting ? 'disabled' : ''}`} disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Update'}
                    </button>
                    <Link to="/" className="btn btn-light ml-3">Cancel</Link>
                  </div>
                </Form>
              )}
            />
          ) : 'Loading...'}
        </div>
      </div>
    );
  }
}

export default EditEmployee;
