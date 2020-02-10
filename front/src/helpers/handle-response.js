import { authenticationService } from '../services';

export function handleResponse(response) {
    return response.text().then(data => {
        data = JSON.parse(data);
        if ([200].indexOf(response.status) < 0) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                // window.location.reload(true);
            }
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        return data;
    });
}
