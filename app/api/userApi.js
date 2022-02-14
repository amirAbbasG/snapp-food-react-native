import http from './';

export const checkNumberApi = number => {
  return http.post('user/checkNumber', {number});
};

export const verifyNumberApi = data => {
  return http.post('user/verifyNumber', data);
};

export const registerUserApi = user => {
  return http.post('user/register', user);
};

export const loginUserApi = user => {
  return http.post('user/login', user);
};

export const editProfileApi = editData => {
  return http.put('user/editProfile', editData);
};

export const forgotPasswordApi = number => {
  return http.post('user/forgetPassword', {number});
};

export const changePasswordApi = data => {
  return http.post('user/changePassword', data);
};

export const changeAuthenticatedUserPasswordApi = data => {
  return http.put('user/changeAuthenticatedUserPassword', data);
};

export const userInformationApi = () => {
  return http.get('user/userInformation');
};
export const getUserCommentsApi = () => {
  return http.get('user/getUserComments');
};
