import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (username, name, email, password, password2, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let url;
    let authData;
    if (!isSignup) {
      authData = {
        username: username,
        password: password
      };
      url = 'http://localhost:3330/user/login';
    } else {
      authData = {
        username: username,
        name: name,
        email: email,
        password: password,
        password2: password2
      };
      url = 'http://localhost:3330/user/register';
    }

    axios
      .post(url, authData)
      .then(response => {
        console.log('Sucessful');
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log('there is an error');
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
