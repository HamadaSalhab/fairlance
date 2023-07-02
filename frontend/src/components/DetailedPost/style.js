import styled from 'styled-components';

export const StyledDetailedPost = styled.div`
    background-color: #ffffff; /* Add this line to set the background color to white */
    border-bottom: solid 1px #d1d1d1;
    padding: 1rem 1.5rem;
    
    &>div:first-child {
        display: flex;
        h4 {
            margin-right: auto;
        }
    }

    .price-range {
        display: flex;
        margin-right: auto;
        div {
            margin: 0 0.5rem;
            display: flex;
            align-items: center;
        }
    }
    &>div:last-child{
        display: flex;
    }
    p{
        white-space: pre-line;
    }
`