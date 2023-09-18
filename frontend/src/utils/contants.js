import Cookies from 'js-cookie';

const titlePages = {
  HOME: 'Home Pages',
  LOGIN: 'Login with your accounts',
  REGISTER: 'Create an accounts',
  MANAGER_USER: 'Manage users',
};

const validate = {
  REQUIRED: 'This field is required',
  MIN: 'Must be more than 5 characters',
  EMAIL: 'This field must be email',
  COMFIRM: 'Enter again confirm password',
};

const menuOptions = [
  { id: 1, name: 'User', to: 'manage/user' },
  { id: 2, name: 'Roles', to: 'manage/role' },
];

const formatTime = (date) => {
  return new Date(date).toLocaleString();
};

const getValueInCookies = (name) => {
  const value = Cookies.get(name);
  return value;
};

export { titlePages, validate, menuOptions, formatTime, getValueInCookies };
