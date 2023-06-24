import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthWrapper, LoginForm, InputField, Error, SubmitButton, InputFieldWrapper, EyeIcon, BrandDetails, LoginDetails } from './style';
import { SignupForm, SignupDetails } from './style';
import NavBar from '../../components/NavBar';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import logo from '../../assets/images/logo-new.png';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const brandRef = useRef();
  const location = useLocation();
  const isSignin = (location.state ? location.state.isSignin : true);
  const [logginIn, setLogginIn] = useState(true);

  useEffect(() => {
    if (isSignin !== logginIn) moveToNextPage();
  }, [isSignin]);

  const handleLogin = (data) => {
    // Simulate login request
    setTimeout(() => {
      console.log(data); // Data contains the form values
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const moveToNextPage = () => {
    if (logginIn) {
      brandRef.current.style.width = '100%';
      setTimeout(() => {
        brandRef.current.style.left = 0;
        brandRef.current.style.width = '50%';
      }, 600);
      window.history.replaceState({ page: 2 }, 'singup', '/signup');
    }
    else {
      brandRef.current.style.width = '100%';
      setTimeout(() => {
        brandRef.current.style.right = 0;
        brandRef.current.style.left = ''
        brandRef.current.style.width = '50%';
      }, 600);
      window.history.replaceState({ page: 2 }, 'login', '/login');
    }
    setLogginIn(!logginIn);
  }

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
            {/* Don't have an account yet? <Link to='/signup'>Signup</Link> instead. */}
            Don't have an account yet? <button className='move-btn' onClick={moveToNextPage}>Signup</button> instead.
          </p>
        </LoginDetails>
        <BrandDetails ref={brandRef}>
          <img srcSet={logo} alt="" />
        </BrandDetails>
        <SignupDetails>
          <h2>Sign Up</h2>
          <p>It's quick and easy</p>
          <SignupForm onSubmit={handleSubmit(handleSignup)}>
            {/* Signup form fields */}
            <InputField
              type={'text'}
              placeholder="Username"
              {...register('username', {
                required: 'Username is required',
              })}
            />
            {errors.username && <Error>{errors.username.message}</Error>}
            <InputFieldWrapper>
              <InputField
                type={showPassword ? 'text' : 'password'}
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

            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => value === getValues('password') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </SubmitButton>
          </SignupForm>
          <p>
            Already have an account? <button className='move-btn' onClick={moveToNextPage}>Login</button> instead.
          </p>
        </SignupDetails>
      </AuthWrapper>
    </div>
  );
};

export default LoginPage;
