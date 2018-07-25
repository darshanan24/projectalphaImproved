import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (username, email, password, passwordConfirm, isSignup) => {
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
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
      };
      url = 'http://localhost:3330/user/signup';
    }

    axios
      .post(url, authData)
      .then(response => {
        console.log('Sucessful');
        console.log(response);
        dispatch(authSuccess(response.data.token, response.data.userId));
      })
      .catch(err => {
        console.log('there is an error');
        console.log(err);
        dispatch(authFail(err.response.data.message));
      });
  };
};
