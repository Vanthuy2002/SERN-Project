const titlePages = {
  HOME: 'Home Pages',
  LOGIN: 'Login with your accounts',
  REGISTER: 'Create an accounts',
  MANAGER_USER: 'Manage users',
  MANAGER_ROLE: 'Manage Roles',
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

const createUUID = () => crypto.randomUUID();

const cloneDeep = (object) => {
  const newObject = JSON.parse(JSON.stringify(object));
  return newObject;
};

const formatTime = (date) => {
  return new Date(date).toLocaleString();
};

const saveToStore = (key, value) => {
  return localStorage.setItem(key, value);
};

const getFromStore = (key) => {
  const value = localStorage.getItem(key);
  return value;
};

export {
  titlePages,
  validate,
  menuOptions,
  formatTime,
  getFromStore,
  saveToStore,
  createUUID,
  cloneDeep,
};
