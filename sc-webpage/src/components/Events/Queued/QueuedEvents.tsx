import React, {FC, useState, useEffect} from "react";
import {Contract} from 'ethers';
import { QueuedEventsWrapper } from "./QueuedEvents.styled";
import { IQueuedEvent } from "./QueuedRecord";
import {QueuedRecord} from "./QueuedRecord";
import { QueuedTitle } from "./QueuedTitle";
import { fetchQueuedEvents } from "../../utils/TimeLockSC";
import Error404 from "../../Errors/Error404";

interface IContract {
    contract: Contract | null,
    client: string,
}

const QueuedEvents: FC<IContract> = (props) => {

    const [events, setEvents] = useState<IQueuedEvent[] | undefined>([]);
    
    const handleQueuedEvents = async() => {
        setEvents(await fetchQueuedEvents(props.contract, props.client));
    }

    useEffect(() => {
        handleQueuedEvents();
    }, [props.contract]);

    return(
        <QueuedEventsWrapper>
            <p>Queued Events of Sells</p>
            {events?.length === 0 || !props.contract ? (<Error404 width={690} height={400}/>) : (
            <table>
                <QueuedTitle/>
                {events?.map((event, index) => (
                    <QueuedRecord index={index + 1} queued={event}/>
                ))}
            </table>
            )}
        </QueuedEventsWrapper>
    )
}

export default QueuedEvents;