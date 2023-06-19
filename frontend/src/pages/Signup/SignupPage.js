import React from 'react';
import './SignupPage.css';

const SignupPage = () => {
  // Handle signup form submission
  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic
  };

  return (
    <div id="signup-page">
      <h2 className='title'>Sign Up</h2>
      <form onSubmit={handleSignup}>
        {/* signup form fields */}
        <input className="input-field"  type="text" placeholder="Username" />
        <input className="input-field"  type="email" placeholder="Email" />
        <input className="input-field" type="password" placeholder="Password" />
        <button className="submit-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;


