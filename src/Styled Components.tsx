import Styled from "styled-components";

const mediaMaxWidth=500

export const StyledHeader=Styled.header<{mouseover:number}>`
    position: sticky;

    
    top: ${props=>props.mouseover?0:'-70px'};
    width: 100%;
    height: 70px;
    padding: 10px 20px;
    border-bottom: 1px solid rgb(53, 53, 53);
    box-sizing: border-box;
    background-color: rgb(20, 20, 20);
    color: #ffffff;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    transition: all .5s;
    @media only screen and (max-width: ${mediaMaxWidth}px) {
        padding: 10px 10px;
        height: 40px;
        top: 0;
    }

`;

export const Aside=Styled.aside<{show:number}>`

    width: 250px;
    height: 100vh;
    border-right: 1px solid #ffffff77;
    box-sizing: border-box;
    background-color: #000000;
    position: absolute;
    top: 0;
    left: ${props=>props.show?0:'-250px'};
    transition: all .5s;
    z-index: 1;
    

`;

export const TrendingUl=Styled.ul<{slide:number}>`
    margin: 0;
    margin-left: 4vw;
    padding: 0;
    display: flex;
    position: absolute;
    top: 35px;
    left: ${props=>window.innerWidth*0.23*props.slide}px;
    transition: all .5s;

    @media only screen and (max-width: ${mediaMaxWidth}px) {
        left: ${props=>window.innerWidth*0.8*props.slide}px;
    }
`;

export const CategoryH1=Styled.h1<{category:string}>`
    width: fit-content;
    font-size: 2.5rem;
    background: linear-gradient(to right, ${props=>
        props.category=='business'?'#000077':
        props.category=='sports'?'#CB2F00':
        props.category=='entertainment'?'#BA00CB':
        props.category=='technology'?'#005FCB':
        props.category=='science'?'#CBB900':
        props.category=='health'&&'#0ACB00'
    } 19px, transparent 0%, transparent);
    margin: 20px 0;
    padding-left: 31px;
    @media only screen and (max-width: ${mediaMaxWidth}px) {
        background: linear-gradient(to right, ${props=>
            props.category=='business'?'#000077':
            props.category=='sports'?'#CB2F00':
            props.category=='entertainment'?'#BA00CB':
            props.category=='technology'?'#005FCB':
            props.category=='science'?'#CBB900':
            props.category=='health'&&'#0ACB00'
        } 15px, transparent 0%, transparent);
        padding-left: 25px;
        font-size: 2rem;
        margin: 20px auto 10px;
    }
`;