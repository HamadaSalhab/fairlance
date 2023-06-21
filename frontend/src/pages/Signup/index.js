import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignupWrapper, Title, SignupForm, InputField, Error, SubmitButton, EyeIcon, InputFieldWrapper } from './style';
import { Link } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import NavBar from '../../components/NavBar';


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm();

  const handleSignup = (data) => {
    // Handle signup logic
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <NavBar></NavBar>
      <SignupWrapper>
      <Title>Sign Up</Title>
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
        Already have an account? <Link to="/login">Login</Link> instead.
      </p>
    </SignupWrapper>
    </div>
  );
};

export default SignupPage;
