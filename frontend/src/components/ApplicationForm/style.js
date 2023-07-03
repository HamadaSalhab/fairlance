import styled from 'styled-components';

export const StyledApplicationForm = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #ffffff;
  border-bottom: solid 1px #d1d1d1;

  h1 {
    font-size: 2rem;
    font-weight: 2000;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 1500;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .price {
        /* margin-left: 1rem; */
        margin-top: 0.2rem;
        width: 80%;
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        input{
            padding: 0.3rem;
            margin: auto .5rem;
            width: 10%;
        }
    }

  input,
  textarea {
    resize: none;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
`;