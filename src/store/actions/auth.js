import axios from '../../axios-blog';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    username: username
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup, username) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      'user': {
        email: email,
        password: password,
        username: username
      }
    };
    let url = '/users';
    if (!isSignup) {
      delete authData.user.username;
      url = '/users/login';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response.data);
        const expirationDate = new Date(new Date().getTime() + 3600*1000);
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);
        dispatch(authSuccess(response.data.user.token, response.data.user.id, response.data.user.username));
        dispatch(checkAuthTimeout(3600 * 24));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        dispatch(authSuccess(token, userId, username));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};