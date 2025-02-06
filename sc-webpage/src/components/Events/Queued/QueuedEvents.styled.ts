import "styled-components";
import styled from "styled-components";

interface IQueuedEventsRow {
    bgColor?: string,
}

export const QueuedEventsWrapper = styled.div`
    background-color: #8aacba;
    padding: 5px;
    margin: 5px;
    width: fit-content;
`;

export const QueuedRowWrapper = styled.tr<IQueuedEventsRow>`
    background-color: ${props => props.bgColor ||  '#8aacba'};
    font-size: 14px;

    & > th, td {
        text-align: center;
        border: 1px solid #000000;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        word-break: break-all;
        padding: 0 2px;
        cursor: pointer;
    }
`