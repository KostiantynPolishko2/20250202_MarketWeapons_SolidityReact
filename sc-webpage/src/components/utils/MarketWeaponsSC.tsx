import {Contract, Wallet, JsonRpcProvider} from 'ethers';
import MarketWeaponsABI from '../../abi/MarketWeapons.json';

export const getMarketWeaponsSC = async() => {
    const GANACHE_URL = "HTTP://127.0.0.1:7545"!;
    const CONTRACT_ADDRESS = "0xD443dAfe8214fD2f3c2B4F30886BD2D71a2F1dF3"!;
    const PRIVATE_KEY = "0x258ea578d8e356e26da3eab80152fc7430a04fa35e6c99d21199b1ee944e420c"!;

    const provider = new JsonRpcProvider(GANACHE_URL);
    await provider.ready;

    const _wallet = new Wallet(PRIVATE_KEY, provider);
    const _contract = new Contract(CONTRACT_ADDRESS, MarketWeaponsABI, _wallet);

    return _contract;
};

export const getContractItem = async(contract: Contract | null) => {
    if (contract){
        const result = await contract.getContractItem();
        console.log('getContractItem');
        return {_owner: result[0], _item: result[1], _time: result[2]};
    }

    return {_owner: undefined, _item: undefined, _time: 0};
}