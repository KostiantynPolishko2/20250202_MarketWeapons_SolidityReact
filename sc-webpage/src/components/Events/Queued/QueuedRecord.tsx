import React, {FC} from "react";
import { QueuedRowWrapper } from "./QueuedEvents.styled";
import "../../styles/standard.css";

export interface IQueuedEvent {
    txId: string;
    timestamp: number;
    func: string;
    client: string;
    sum: number;
}

interface IQueued {
    index: number,
    queued: IQueuedEvent,
}

export const QueuedRecord: FC<IQueued> = (props) => {
    return(
        <QueuedRowWrapper bgColor="#6f9ed9">
            <td>{props.index}</td>
            {/* <td>{props.queued.txId}</td>
            <td>{props.queued.func}</td>
            <td>{props.queued.client}</td> */}
            <td>{"undefined"}</td>
            <td>{props.queued.sum}</td>
            <td style={{width: "200px"}}>{new Date(props.queued.timestamp * 1000).toLocaleString()}</td>
        </QueuedRowWrapper>
    );
}
