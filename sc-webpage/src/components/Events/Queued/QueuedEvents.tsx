import React, {FC, useState, useEffect} from "react";
import {Contract, EventLog} from 'ethers';
import { QueuedEventsWrapper } from "./QueuedEvents.styled";
import { IQueuedEvent } from "./QueuedRecord";
import {QueuedRecord} from "./QueuedRecord";
import { QueuedTitle } from "./QueuedTitle";
import { fetchQueuedEvents } from "../../utils/TimeLockSC";

interface IContract {
    contract: Contract | null,
}

const QueuedEvents: FC<IContract> = (props) => {
    const [events, setEvents] = useState<IQueuedEvent[] | undefined>([]);
    
    const handleQueuedEvents = async() => {
        setEvents(await fetchQueuedEvents(props.contract));
    }

    useEffect(() => {
        handleQueuedEvents();
    }, [props.contract]);

    return(
        <QueuedEventsWrapper>
            <p>Queued Events of Sells</p>
            {events?.length === 0 ? (<p>No events found.</p>) : (
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