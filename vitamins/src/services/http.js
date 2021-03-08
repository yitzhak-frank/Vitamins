import axios from 'axios';
import { toast } from 'react-toastify';
import { getJwt } from './usersService';

axios.defaults.headers.common['x-auth-token'] = getJwt();
export const setTokenHeaders = () => axios.defaults.headers.common['x-auth-token'] = getJwt();

axios.interceptors.response.use(null, err => {
    if(err.response && err.response.status === 409) toast.error('המשתמש כבר קיים במערכת');
    else if(err.response && err.response.status >= 403) toast.error('אירעה שגיאה בלתי צפויה');
    else if(err.response && err.response.data.message === 'invalid user or password') toast.error('שם המשתמש או הסיסמא שהוזנו שגויים');
    return Promise.reject(err);
})

const requests = {
    get:    axios.get,
    post:   axios.post,
    put:    axios.put,
    patch:  axios.patch,
    delete: axios.delete,
}

export default requests;