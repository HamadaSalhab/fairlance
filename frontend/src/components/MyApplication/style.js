import styled from 'styled-components';

export const StyledMyApplication = styled.div`
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
