import { handleErrors } from '../';

const register = (credentials) => {
    return fetch('/auth/register', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(user => user)
}

export default register;
