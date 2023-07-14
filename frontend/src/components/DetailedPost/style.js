import styled from 'styled-components';

export const StyledDetailedPost = styled.div`
    background-color: #ffffff; /* Add this line to set the background color to white */
    padding: 1rem 1.5rem;
    min-height: 30vh;
    box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.1);
    & > div:first-child {
        display: flex;
        div {
            margin-left: auto;
        }
        h4 {
            color: #777;
            font-weight: bold;
            text-decoration: none;
            &:hover {
                color: #1e88e5;
            }
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
    .price-info {
        display: flex;
    }
    p {
        white-space: pre-line;
    }
`;

export const StyledApply = styled.div`
    padding: 1rem 1.5rem;
    width: 100%;
    background-color: #fff;
    margin-top: 1rem;
    box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.1);
    label {
        font-weight: 600;
        display: block;
        margin-top: 1rem;
    }
    textarea {
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
    p {
        color: #a2a2a2;
    }
    .proposal {
        display: flex;
        button {
            margin-left: auto;
        }
        input {
            margin-left: 1rem;
            padding: 0.5rem;
            width: 80px;
        }
    }
`;

export const StyledApplications = styled.div`
    width: 100%;
    background-color: #fff;
    margin-top: 1rem;
    box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.1);
    .price-info {
        display: flex;
        .price-range {
            margin-right: auto;
        }
    }
    button {
        padding: 0.5rem;
    }
    p {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    & > div {
        padding: 1.5rem 1.5rem;
        border-bottom: solid 1px #a2a2a2;
        &:last-child {
            border: none;
        }
    }
    h3 {
        padding: 0.5rem;
        border-bottom: solid 1px;
    }
    .loading {
        height: 200px;
        padding: 1rem;
    }
`;

export const StyledApplication = styled.div`
    width: 85%;
    background-color: #fff;
    margin: 0 auto;
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0px 0px 12px -1px rgba(30, 136, 229, 0.1);
    a {
        text-decoration: none;
    }
    h4 {
        margin-bottom: 1.5rem;
        font-weight: bold;
        text-decoration: none;
        color: #777;
        &:hover {
            color: #1e88e5;
        }
    }
    .price-info {
        display: flex;
        margin-top: 1.5rem;
        .price-range {
            margin-right: auto;
        }
    }
`;
