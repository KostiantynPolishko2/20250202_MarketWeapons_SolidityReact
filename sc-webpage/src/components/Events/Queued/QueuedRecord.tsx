import React, {FC, useContext} from "react";
import { QueuedRowWrapper } from "./QueuedEvents.styled";
import "../../styles/standard.css";
import { HandleTxIdContext } from "../../SC_Page";

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
    const handleTxId = useContext(HandleTxIdContext);

    return(
        <QueuedRowWrapper bgColor="#6f9ed9" onClick={handleTxId}>
            <td>{props.index}</td>
            <td>{props.queued.txId}</td>
            {/* <td>{props.queued.func}</td>
            <td>{props.queued.client}</td>
            <td>{"undefined"}</td> */}
            <td>{props.queued.sum}</td>
            <td style={{width: "200px"}}>{new Date(props.queued.timestamp * 1000).toLocaleString()}</td>
        </QueuedRowWrapper>
    );
}
