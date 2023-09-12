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
  { id: 2, name: 'Permission', to: 'manage/role' },
];

export { titlePages, validate, menuOptions };
