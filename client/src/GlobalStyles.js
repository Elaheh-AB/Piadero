import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {
      --primary-color: #FDFFFC;
      --secondary-color: #4A5759;
      --red-alert: #EB1018;
      --warning: #F1D302;
      --font-color: #020100;
      --success: #ffc93c;
      --bg-color: #efefef;
      --page-horizontal-padding: 20px;
      --header-height: 100px;
      --max-content-width: 1200px;
      --font-family: 'Raleway', sans-serif;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
        font-family: var(--font-family);
        color:(--font-color);
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        background: var(--bg-color);
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    
    h1, h2, h3 {
      color: var(--font-color);
      font-family: var(--font-family);
    }
    h1 {
        font-size: 2em;
      }
    h2 {
      font-size: 1.75em;
    }
    h3 {
        font-size: 1.5em;
    }

    button {
        background: transparent;
        font-family: var(--font-family);
        color: var(--font-color);
        border: none;
        border-radius:5px;
        outline: 1px solid var(--font-color);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

        :hover {
            cursor:pointer;
            background: var(--warning);
            transition: 0.5s ease-in-out;
            outline: 1px solid var(--warning);
        }
        :disabled {
            cursor: not-allowed;
            background: transparent;
            outline: 1px solid var(--font-color);

        }
    }

    a {
        text-decoration: none;
        padding: 10px;
        margin: 5px;
        color: var(--font-color);
      
        &:hover {
            text-decoration: underline;
            text-underline-offset: 4px;
        }
      
        &.active {
            text-decoration: underline;
            text-underline-offset: 4px;
        }
    }

    a,button,small,bold,text,svg {
        font-size: 1.25em;
    }

    input[type="text"] {
        height:25px;
        font-size: var(--font-size)
    }
`;
