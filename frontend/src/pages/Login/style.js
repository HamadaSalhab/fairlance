import styled from 'styled-components';

export const AuthWrapper = styled.div`
  width: 85%;
  box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.2);
  background-color: #fff;
  border-radius: 1rem;
  height: 80vh;
  margin: 1rem auto;
  position: absolute;
  left: 0;
  right: 0;
  p{
    color: #a1a1a1;
  }
  h2{
    padding-bottom: 0.5rem;
  }
  .move-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #555;
    &:hover{
      text-decoration: underline;
    }
  }
`;

export const LoginDetails = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const BrandDetails = styled.div`
  width: 50%;
  height: 100%;
  background-color: #eefafd;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.5s;
  z-index: 1;
  img{
    width: 60%;
  }
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-top: 20px;
`;

export const InputFieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const EyeIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
`;

export const Error = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: left;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: #1E88E5;
  border: solid #1E88E5 1px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const SignupDetails = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
`

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-top: 20px;
`;
