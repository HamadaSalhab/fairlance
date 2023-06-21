import styled from 'styled-components';

export const LoginWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.h2`
  padding-bottom: 1%;
`;

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
