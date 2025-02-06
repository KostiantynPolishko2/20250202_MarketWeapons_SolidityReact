import React, {FC} from "react";

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
        <>
            <tr>
                <td>{props.index}</td>
                <td>{props.queued.txId}</td>
                <td>{props.queued.func}</td>
                <td>{props.queued.client}</td>
                <td>{props.queued.sum}</td>
                <td>{new Date(props.queued.timestamp * 1000).toLocaleString()}</td>
            </tr>
        </>
    );
}
