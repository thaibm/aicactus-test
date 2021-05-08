import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  FormGroup,
  CircularProgress,
} from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form`
  display: flex;
  width: 500px;
  flex-direction: column;
  margin: 50px auto;
`;

const FormItem = styled(FormGroup)`
  margin-bottom: 15px;
  flex: 1;
`;

const SignupSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post('/register', data)
      .then((response) => {
        setLoading(false);
        alert('Succeeded!');
      })
      .catch((error) => {
        setLoading(false);
        alert('Failed!');
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <TextField
          label='First Name'
          variant='outlined'
          {...register('firstName')}
          error={errors.firstName}
          helperText={errors.firstName && errors.firstName.message}
        />
      </FormItem>
      <FormItem>
        <TextField
          label='Last Name'
          variant='outlined'
          {...register('lastName')}
          error={errors.lastName}
          helperText={errors.lastName && errors.lastName.message}
        />
      </FormItem>
      <FormItem>
        <TextField
          label='Email'
          variant='outlined'
          type='email'
          {...register('email')}
          error={errors.email}
          helperText={errors.email && errors.email.message}
        />
      </FormItem>
      <FormItem>
        <TextField
          label='Password'
          variant='outlined'
          type='password'
          {...register('password')}
          error={errors.password}
          helperText={errors.password && errors.password.message}
        />
      </FormItem>
      <FormItem>
        <TextField
          label='Confirm Password'
          variant='outlined'
          type='password'
          {...register('confirmPassword')}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
        />
      </FormItem>

      <Button
        disabled={!isDirty}
        variant='contained'
        color='primary'
        type='submit'
      >
        {loading ? <CircularProgress></CircularProgress> : 'Submit'}
      </Button>
    </Form>
  );
};

export default RegisterForm;
