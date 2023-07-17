import styled from 'styled-components';

export const StyledContainer = styled.div`
  box-sizing: border-box;
  
  box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.2);
  /* border-top-left-radius: 1rem;
  border-top-right-radius: 1rem; */
  border-radius: 1rem;
  background-color: #fff;
  /* background-color: purple; */
  margin: 10rem auto;
  padding: 2rem;
  left: 0;
  right: 0;
  width: 70%;
  section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }
`;

export const BalanceContainer = styled.div`
  box-sizing: border-box;
  align-items: center;
  box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.2);
  /* border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem; */
  border-radius: 1rem;
  background-color: #fff;
  /* background-color: green; */
  margin: 0 auto;
  margin-bottom: 10rem;
  padding: 2rem;
  left: 0;
  right: 0;
  width: 70%;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: yellow; */
  margin-left: 1rem;
  height: 100%;
  width: 50%;
  h2 {
    margin-bottom: 1rem;
  }
  label{
    margin-top: 1rem;
    margin-bottom: 0.3rem;
    font-weight: 650;
  }
`;

export const BalanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: blue; */
  margin: 0 1rem;
  width: 100%;
  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  section {
    /* background-color: green; */
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      width: 45%;
      /* background-color: purple; */

      label{
        margin-top: 1rem;
        margin-bottom: 0.3rem;
        font-weight: 650;
      }
    } 
  }
`;

export const InfoBox = styled.div`
  /* background-color: red; */
  width: 85%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const BalanceBox = styled.div`
  /* background-color: red; */
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const InputField = styled.input`
  width: 90%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: 550;
`;

export const StyledPfp = styled.div`
  height: 100%;
  /* background-color: green; */
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
  margin: 5px 0; 
  width: 5rem;
  padding: 10px;
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

export const UpdateMessage = styled.div`
  width: auto;
  color: #fff;
  background-color: green;
  padding: 10px;
  border-radius: 4px;
`;