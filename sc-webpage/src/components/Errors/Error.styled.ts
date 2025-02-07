import styled from "styled-components";

export interface ISize {
    width: number,
    height: number,
}

export interface IError {
    size: ISize,
    _url?: string,
}

export const ErrorWrapper = styled.div<IError>`
    /* background-color: #f5db33; */
    margin: 5px;
    width: ${props => props.size.width}px;
    height: ${props => props.size.height}px;
    background-image: url(${props => props._url});
    background-repeat: no-repeat;
    background-size: ${props => props.size.width}px ${props => props.size.height}px;
`