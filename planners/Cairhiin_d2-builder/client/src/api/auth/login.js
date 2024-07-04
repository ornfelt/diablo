import { handleErrors } from '../';

const login = (credentials) => {
    return fetch('/auth/login', {
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

export default login;
