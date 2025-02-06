import {Contract, Wallet, JsonRpcProvider} from 'ethers';
import MarketWeaponsABI from '../../abi/TimeLock.json';

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