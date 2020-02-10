import { authHeader, handleResponse } from '../helpers';

const config = {
    apiUrl: process.env.REACT_APP_API_URL
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/employees`, requestOptions).then(handleResponse);
}

function get(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/employees/${id}`, requestOptions).then(handleResponse);
}

function update(id, data) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader()},
        body: JSON.stringify({ ...data })
    };
    return fetch(`${config.apiUrl}/employees/${id}`, requestOptions).then(handleResponse);
}

export const employeeService = {
    getAll,
    get,
    update
};
