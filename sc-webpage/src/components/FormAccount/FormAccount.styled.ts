import styled from "styled-components";
import { ButtonWrapper } from "../styles/standard.styled";

interface IFormAccount {
    isDisable: boolean,
}

export const FormAccountWrapper = styled.form<IFormAccount>`
    background-color:rgb(189, 216, 125);
    color: black;
    margin: 5px;
    padding: 5px;
    width: 711px;
    height: 80px;

    & input {
        background-color: ${props => props.isDisable? '#9fa888' : 'whitesmoke'};
        padding: 2px;
        margin: 2px;
        width: 500px;
        min-width: fit-content;
        height: 25px;
        position: relative;
        right: 100px;
    }

    & input, button {
        cursor: pointer;
    }

    & label {
        cursor: context-menu;
    }

    & > button {
        position: relative;
        bottom: 60px;
        left: 300px;
    }
`

export const ButtonAuth = styled(ButtonWrapper).attrs({
    name: 'auth',
    type: 'button',
    autoFocus: false,
})<IFormAccount>`
    background-color: ${props => !props.isDisable? "rgb(19, 204, 28)" : "rgb(57, 114, 59)"};
`