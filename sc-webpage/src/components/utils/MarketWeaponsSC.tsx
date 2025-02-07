import {Contract, Wallet, JsonRpcProvider} from 'ethers';
import MarketWeaponsABI from '../../abi/MarketWeapons.json';

export const getMarketWeaponsSC = async(privateKey: string) => {
    const GANACHE_URL = process.env.REACT_APP_GANACHE_URL!;
    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS_MARKET_WEAPONS!;

    const provider = new JsonRpcProvider(GANACHE_URL);
    await provider.ready;

    const _wallet = new Wallet(privateKey, provider);
    const _contract = new Contract(CONTRACT_ADDRESS, MarketWeaponsABI, _wallet);

    return _contract;
};

export const getContractItem = async(contract: Contract | null) => {
    if (contract){
        const result = await contract.getContractItem();
        console.log('getContractItem result', result);
        return {_owner: result[0], _item: result[1], _time: result[2]};
    }

    console.log('getContractItem result', 'none');
    return {_owner: undefined, _item: undefined, _time: 0};
}