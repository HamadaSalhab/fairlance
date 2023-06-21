import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginWrapper, Title, LoginForm, InputField, Error, SubmitButton, InputFieldWrapper, EyeIcon } from './style';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    // Simulate login request
    setTimeout(() => {
      console.log(data); // Data contains the form values
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <NavBar>
      </NavBar>
      <LoginWrapper>
        <Title>Login</Title>
        <LoginForm onSubmit={handleSubmit(handleLogin)}>
          <InputField
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
          <InputFieldWrapper>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <EyeIcon onClick={togglePasswordVisibility}>
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </EyeIcon>
          </InputFieldWrapper>
          {errors.password && <Error>{errors.password.message}</Error>}
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </LoginForm>
        <p>
          Don't have an account yet? <Link to='/signup'>Signup</Link> instead.
        </p>
      </LoginWrapper>
    </div>
  );
};

export default LoginPage;
