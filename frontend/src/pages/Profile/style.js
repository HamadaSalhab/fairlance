import styled from 'styled-components';

export const StyledContainer = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.2);
  border-radius: 1rem;
  background-color: #fff;
  position: absolute;
  margin: 1rem auto;
  padding: 2rem;
  top: 4rem;
  left: 0;
  right: 0;
  width: 70%;
`;

export const ProfileInfo = styled.div`
  /* background-color: yellow; */
  margin-left: 1rem;
  width: 45%;
  h2 {
    margin-bottom: 2rem;
  }
  label{
    margin: 1rem 0;
    font-weight: 650;
  }
`;

export const InfoBox = styled.div`
  width: auto;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledPfp = styled.div`
  img {
    border-radius: 50%;
    border: 2px solid #ccc;
    width: 42vh;
    height: 42vh;
    margin: 2rem;
    margin-right: 3rem;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;

  }
  label {
    margin-left: 2rem;
    font-weight: 650;
  }
`;

export const UploadPhoto = styled.div`
  width: auto;
  margin-left: 2rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const Button = styled.button`
  width: 5rem;
  padding: 10px;
  margin-top: 1rem;
  margin-right: 1rem;
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