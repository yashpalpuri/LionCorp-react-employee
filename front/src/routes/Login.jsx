import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../services';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // redirect to dashboard if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-31">
          <div className="alert alert-info">
            Username: admin<br />
            Password: admin
          </div>
          <h2>Login</h2>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required('Username is required'),
              password: Yup.string().required('Password is required')
            })}
            onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
              setStatus();
              authenticationService.login(username, password)
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
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <button type="submit" className={`btn btn-primary ${isSubmitting ? 'disabled' : ''}`} disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    )
  }
}

export default Login;
