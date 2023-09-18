import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;

        width: max-content;
        
        line-height: 150%;
        
        box-sizing: border-box;
    }

    html, body {
        background-color: ${({ theme }) => theme.colors.main4};

        max-width: 100%; 

        overflow-x: hidden;
    }

    img {
        -webkit-user-drag: none;
        -moz-user-drag: none;
        -ms-user-drag: none;
        -webkit-user-select: none;
        user-select: none;
    }

    button, input {
        background-color: transparent;

        border: none;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    picture {
        display: flex;
    }

    ul {
        list-style-type: none;
    }
`;

export default GlobalStyle;
