import {Contract, Wallet, JsonRpcProvider, EventLog} from 'ethers';
import MarketWeaponsABI from '../../abi/TimeLock.json';
import { IQueuedEvent } from '../Events/Queued/QueuedRecord';

export const getTimeLockSC = async() => {
    const GANACHE_URL = "HTTP://127.0.0.1:7545"!;
    const CONTRACT_ADDRESS = "0x8af7048a6328fFa589c85d1dDE747Eb5F63D4153"!;
    const PRIVATE_KEY = "0x258ea578d8e356e26da3eab80152fc7430a04fa35e6c99d21199b1ee944e420c"!;

    const provider = new JsonRpcProvider(GANACHE_URL);
    await provider.ready;

    const _wallet = new Wallet(PRIVATE_KEY, provider);
    const _contract = new Contract(CONTRACT_ADDRESS, MarketWeaponsABI, _wallet);

    return _contract;
};

export const fetchQueuedEvents = async(contract: Contract | null):Promise<IQueuedEvent[] | undefined> => {
    try {
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
            return formattedEvents;
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