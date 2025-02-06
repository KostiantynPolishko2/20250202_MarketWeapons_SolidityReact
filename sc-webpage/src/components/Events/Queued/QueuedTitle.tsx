import React, {FC} from "react";
import { QueuedRowWrapper } from "./QueuedEvents.styled";

export const QueuedTitle: FC = () => {
    return(
        <QueuedRowWrapper bgColor="#8a96ba">
            <th>N</th>
            {/* <th>TxID</th>
            <th>Function</th>
            <th>Client</th> */}
            <th>Product</th>
            <th>Sum</th>
            <th>Date</th>
        </QueuedRowWrapper>
    );
}