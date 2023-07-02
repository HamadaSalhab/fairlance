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

export const StyledApply = styled.div`
    padding: 1rem 1.5rem;
    width: 100%;
    background-color: #fff;
    margin-top: 1rem;
    box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.1);
    label{
        font-weight: 600;
        display: block;
        margin-top: 1rem;
    }
    textarea{
        margin-left: 0.7rem;
        margin-top: 0.5rem;
        width: 95%;
        height: 65%;
        resize: none;
        color: #616161;
        font-size: 1rem;
        padding: 0.6rem;
        height: 250px;
    }
    p{
        color: #a2a2a2;
    }
    .proposal{
        display: flex;
        button{
            margin-left: auto;
        }
        input{
            margin-left: 1rem;
            padding: 0.5rem;
            width: 80px
        }
    }
`