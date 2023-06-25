import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthWrapper, LoginForm, InputField, Error, SubmitButton, InputFieldWrapper, EyeIcon, LoginDetails } from './style';
import NavBar from '../../components/NavBar';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm();
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

  const handleSignup = (data) => {
    // Handle signup logic
  };

  return (
    <div>
      <NavBar notfixed={true} />
      <AuthWrapper>
        <LoginDetails>
          <h2>Welcome back</h2>
          <p>Please enter your details</p>
          <LoginForm onSubmit={handleSubmit(handleLogin)}>
            <label htmlFor="email">Email</label>
            <InputField
              type="email"
              id="email"
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
              <label htmlFor="password">Password</label>
              <InputField
                type={showPassword ? "text" : "password"}
                id="password"
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
            {/* Don't have an account yet? <Link to='/signup'>Signup</Link> instead. */}
            Don't have an account yet? <Link to='/signup' className='move-btn'>Signup</Link> instead.
          </p>
        </LoginDetails>
      </AuthWrapper>
    </div>
  );
};

export default LoginPage;
