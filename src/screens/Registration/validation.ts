import * as Yup from 'yup';

export const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'errors.passwordShort')
    .matches(/(?=.*[0-9])/, 'errors.passwordMustContainNumber')
    .matches(/(?=.*[A-Z])/, 'errors.passwordMustContainLetter'),
});
