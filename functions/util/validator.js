const isEmpty = (string) => {
  if (string.trim() === '') return true;
  return false;
};

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(emailRegEx)) return true;
  return false;
};

exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty.';
  else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address.';
  }

  if (isEmpty(data.name)) errors.name = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Passwords must match.';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty.';
  if (isEmpty(data.password)) errors.password = 'Must not be empty.';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
