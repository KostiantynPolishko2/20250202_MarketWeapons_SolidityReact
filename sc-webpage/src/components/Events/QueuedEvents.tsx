import React, {FC, useState, useEffect} from "react";
import {Contract, EventLog} from 'ethers';
import { QueuedEventsWrapper } from "./QueuedEvents.styled";
import { IQueuedEvent } from "./QueuedRecord";
import {QueuedRecord} from "./QueuedRecord";

interface IContract {
    contract: Contract | null,
}

const QueuedEvents: FC<IContract> = (props) => {
    const [events, setEvents] = useState<IQueuedEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const contract = props.contract;

                // Fetch all past "Queued" events
                if (contract){
                    const filter = contract.filters.Queued();  // Filter for all Queued events
                    const events = await contract.queryFilter(filter);
                    console.log('queued events', events);

                    // Map and format the events
                    const formattedEvents: IQueuedEvent[] = events.map(event => {
                        const typedEvent = event as EventLog; 

                        return {
                            txId: typedEvent.args[0],
                            timestamp: Number(typedEvent.args[1]),
                            func: typedEvent.args[2],
                            client: typedEvent.args[3],
                            sum: Number(typedEvent.args[4]),
                        }
                    });
    
                    setEvents(formattedEvents);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return(
        <QueuedEventsWrapper>
            <p>QueuedEvents</p>
            {events.length === 0 ? (<p>No events found.</p>) : (
            <>
                <tr>
                    <th>N</th>
                    <th>TxID</th>
                    <th>Function</th>
                    <th>Client</th>
                    <th>Sum</th>
                    <th>Date</th>
                </tr>
                {events.map((event, index) => (
                    <QueuedRecord index={index} queued={event}/>
                ))}
            </>
            )}
        </QueuedEventsWrapper>
    )
}

export default QueuedEvents;