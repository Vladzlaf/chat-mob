import * as yup from 'yup';
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidationSchema = yup.object({
  email: yup
    .string()
    .email('errors.invalidEmail')
    .matches(emailRegex, 'errors.invalidEmail')
    .required('errors.invalidEmail'),
});
