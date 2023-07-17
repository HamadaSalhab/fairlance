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
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
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
  label {
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
    margin: 2rem 0;
  }

  #wallet-box {
    width: 50%;
    margin-bottom: 1rem;

    label {
      margin-top: 1rem;
      margin-bottom: 0.3rem;
      font-weight: 650;
    }
  }

  #balance-container {
    /* background-color: green; */
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    div {
      display: flex;
      flex-direction: column;
      width: 50%;
      /* background-color: purple; */

      label{
        margin-top: 1rem;
        margin-bottom: 0.3rem;
        font-weight: 650;
      }

      #withdrawButton {
        width: 30%;
      }

      #depositButton {
        width: 30%;
      }

    } 
  }
`;

export const InfoBox = styled.div`
  width: 90%;
  /* min-height: 2.6rem; */
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
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

export const DepositField = styled.input`
  width: 50%;
  height: 90%;
  padding: 10px;
  margin-bottom: 0.5rem;
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

export const StyledButton = styled.button`
  width: 5rem;
  padding: 10px;
  margin: 1rem 0;
  background-color: #1e88e5;
  border: solid #1e88e5 1px;
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
