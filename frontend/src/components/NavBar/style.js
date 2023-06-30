import { styled } from 'styled-components';

export const StyledNav = styled.ul`
    background-color: #fff;
    box-shadow: 1px 2px 8px 0px rgba(30, 136, 229, 0.1);
    position: ${props => props.$notfixed ? 'static' : 'fixed'};
    width: 100%;
    z-index: 1;
    top: 0;
    #nav-container{
        display: flex;
        align-items: center;
        list-style: none;
        height: 2rem;
        padding: 2rem 0;
        width: 85%;
        margin: 0 auto;
        li {
            margin-left: 1rem;
            a {
                text-decoration: none;
                color: #000;
                font-size: 1.2rem;
                font-weight: 500;
                cursor: pointer;
                &:hover {
                    color: #1E88E5;
                    transition: all 0.3s;
                }
            }
            &:first-child {
                margin-left: 0;
                margin-right: auto;
                span {
                    color: #1E88E5;
                }
                img {
                    height: 2.7rem;
                }
            }
            &:nth-child(4) {
                margin-right: auto;
            }
            .active {
                color: #1E88E5;
            }
        }
    }
`