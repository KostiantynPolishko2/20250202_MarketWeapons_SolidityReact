import {Contract, Wallet, JsonRpcProvider, EventLog, Log} from 'ethers';
import MarketWeaponsABI from '../../abi/TimeLock.json';
import { IQueuedEvent } from '../Events/Queued/QueuedRecord';

export const getTimeLockSC = async(privateKey: string) => {
    const GANACHE_URL = process.env.REACT_APP_GANACHE_URL!;
    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS_TIME_LOCK!;

    const provider = new JsonRpcProvider(GANACHE_URL);
    await provider.ready;

    const _wallet = new Wallet(privateKey, provider);
    const _contract = new Contract(CONTRACT_ADDRESS, MarketWeaponsABI, _wallet);

    return _contract;
};

const getAllQueuedEvents = (events: EventLog[]):IQueuedEvent[] => {
    // Map and format the events
    return events.map(event => {
        const typedEvent = event as EventLog; 

        return {
            txId: typedEvent.args[0],
            timestamp: Number(typedEvent.args[1]),
            func: typedEvent.args[2],
            client: typedEvent.args[3],
            sum: Number(typedEvent.args[4]),
        }
    });
}

const getClientQueuedEvents = (events: EventLog[], client: string):IQueuedEvent[] => {
    // Map and format the events
    return events.reduce((acc: IQueuedEvent[], event) => {
        const typedEvent = event as EventLog;
        
        if (client === typedEvent.args[3]){
            acc.push({
                txId: typedEvent.args[0],
                timestamp: Number(typedEvent.args[1]),
                func: typedEvent.args[2],
                client: typedEvent.args[3],
                sum: Number(typedEvent.args[4]),
            })
        }

        return acc;
    }, []);
}

export const fetchQueuedEvents = async(contract: Contract | null, client: string):Promise<IQueuedEvent[] | undefined> => {
    try {
        // Fetch all past "Queued" events
        if (contract){
            const filter = contract.filters.Queued();  // Filter for all Queued events
            const events: (Log | EventLog)[] = (await contract.queryFilter(filter));
            // console.log('queued events', events);

            // filter to get only EventLog Items
            const eventsLog = events.filter((log): log is EventLog => 'args' in log);

            if (client === process.env.REACT_APP_OWNER_CONTRACT_ADDRESS){
                return getAllQueuedEvents(eventsLog);
            }
            
            return getClientQueuedEvents(eventsLog, client);
        }
    } catch (error) {
        // console.error('Error fetching events:', error);
        const formattedEvents: IQueuedEvent[] = [];
        return formattedEvents;
    }
}

export const getTxDataByID = async(txId: string, contract: Contract | null) => {
    try{
        return await contract?.getTxData(txId);
    }
    catch (error){
        return null;
    }
}

export const executeTxById = async(txId: string, contract: Contract | null) => {
    try{
        return await contract?.execute(txId);
    }
    catch (error){
        return null;
    }
}

export const discardTxById = async(txId: string, contract: Contract | null) => {
    try{
        return await contract?.discard(txId);
    }
    catch (error){
        return null;
    }
}