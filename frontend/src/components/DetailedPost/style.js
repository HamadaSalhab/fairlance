import styled from 'styled-components';

export const StyledDetailedPost = styled.div`
    background-color: #ffffff; /* Add this line to set the background color to white */
    padding: 1rem 1.5rem;
    min-height: 30vh;
    box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.1);
    &>div:first-child {
        display: flex;
        h4 {
            margin-right: auto;
        }
    }

    .price-range {
        margin-top: 1rem;
        display: flex;
        margin-right: auto;
        div {
            margin: 0 0.5rem;
            display: flex;
            align-items: center;
        }
    }
    .price-info{
        display: flex;
    }
    p{
        white-space: pre-line;
    }
`