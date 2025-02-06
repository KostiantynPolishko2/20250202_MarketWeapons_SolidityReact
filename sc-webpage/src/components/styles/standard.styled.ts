import 'styled-components';
import styled from 'styled-components';

interface IBlockTopLeft {
    _top?: number,
    _left?: number,
}

interface IBlockBottomRight {
    _bottom?: number,
    _right?: number,
}

interface IBlockTopRight {
    _top?: number,
    _right?: number,
}

export const BlockTopLeft = styled.div<IBlockTopLeft>`
    position: absolute;
    top: ${props => props?._top || 0}px;
    left: ${props => props?._left || 0}px;
`;

export const BlockBottomRight = styled.div<IBlockBottomRight>`
    position: absolute;
    bottom: ${props => props?._bottom || 0}px;
    right: ${props => props?._right || 0}px;
`;

export const BlockTopRight = styled.div<IBlockTopRight>`
    position: absolute;
    top: ${props => props?._top || 0}px;
    right: ${props => props?._right || 0}px;
`;

export const DisplayWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

interface IButtonWrapper {
    color?: string
}

export const ButtonWrapper = styled.button<IButtonWrapper>`
    background-color: ${props => props.color || 'grey'};
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    color: black;
    cursor: pointer;
`