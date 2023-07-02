import styled from 'styled-components';

export const StyledPostDetailsComponent = styled.div`
    width: 85%;
    margin: 5rem auto;
    min-height: 60vh;
    h4 {
        font-weight: 300;
        margin-right: 1rem;
        display: inline-block;
    }
    h3 {
        margin-top: 0.5rem;
        overflow-wrap: break-word; /* Add this line to allow long words to wrap */
    }
    h4 {
        font-weight: 500;
    }
    p {
        overflow-wrap: break-word; /* Add this line to allow long words to wrap */
        margin: 1rem 0.5rem;
    }
`;
