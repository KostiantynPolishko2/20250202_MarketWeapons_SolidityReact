import React, {FC, useState, useEffect, createContext} from 'react';
import {Contract} from 'ethers';
import 'the-new-css-reset';
import './SC_Page.css';
import {getMarketWeaponsSC, getContractItem} from './utils/MarketWeaponsSC';
import { getTimeLockSC } from './utils/TimeLockSC';
import ContractItem from './ContractItem/ContractItem';
import { IContractFields } from './ContractItem/ContractItem';
import { BlockTopLeft, BlockTopRight, BlockShow} from './styles/standard.styled';
import QueuedEvents from './Events/Queued/QueuedEvents';
import TxData from './TxData/TxData';
import FundSources from './FundSources/FundSources';
import FormAccount from './FormAccount/FormAccount';
import { IAccount } from './FormAccount/FormAccount';

export const HandleTxIdContext = createContext((e: React.FormEvent<HTMLElement>):void=>{});

const SC_Page: FC = () => {
  const [isContractLoaded, setIsContractLoaded] = useState<boolean>(false);
  const [marketWeaponsSC, setMarketWeaponsSC] = useState<Contract | null>(null);
  const [lockTimesSC, setLockTimeSC] = useState<Contract | null>(null);
  const [contractFields, setContractFields] = useState<IContractFields>();
  const [txId, setTxId] = useState<string>("undefined");
  const [accountData, setAccountData] = useState<IAccount>({account: 'undefined', privateKey: 'undefined'});
  const [isShowFundSources, setIsShowFundSources] = useState<boolean>(false);
  const [isLoadContractData, setIsLoadContractData] = useState<boolean>(false);

  const OWNER_CONTRACT_ADDRESS = process.env.REACT_APP_OWNER_CONTRACT_ADDRESS;

  const handleSetAccount = (_account: string, _privateKey: string): void => {
    setAccountData({account: _account, privateKey: _privateKey});
    setIsShowFundSources(_account === OWNER_CONTRACT_ADDRESS);
    setIsContractLoaded(true);
  }

  const handleMWSC = async () => {
    setMarketWeaponsSC(await getMarketWeaponsSC(accountData?.privateKey));
    // console.log('marketWeaponsSC', marketWeaponsSC);
  }

  const handleLTSC = async () => {
    setLockTimeSC(await getTimeLockSC(accountData?.privateKey));
    // console.log('lockTimesSC', lockTimesSC);
  }
  
  const handleContractItem = async () => {
    if(isContractLoaded){
      setContractFields(await getContractItem(marketWeaponsSC));
      setIsLoadContractData(true);
    }
    // console.log('contractFields', contractFields);
  }

  const handleTxId = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setTxId(e.currentTarget.firstElementChild?.nextElementSibling?.textContent || "undefined");
    // console.log('rows events', e.currentTarget.firstElementChild?.nextElementSibling?.textContent);
  }

  useEffect(() => {
    if(accountData.privateKey !== 'undefined'){
      handleMWSC();  // init entity of MarketWeapons.sol
      handleLTSC();  // init entity of TimeLock.sol
    }
    // handleContractItem();
  }, [isContractLoaded]);

  return (
    <div className="SC_App">
      <header className="SC_App-header">
        <BlockTopLeft _top={0} _left={10}>
          <button onClick={handleContractItem} disabled={isLoadContractData} style={{cursor: !isLoadContractData? 'pointer' : 'context-menu'}}>
            <ContractItem _owner={contractFields?._owner} _item={contractFields?._item} _time={contractFields?._time}/>
          </button>
        </BlockTopLeft>
        <BlockShow show={isContractLoaded}>
          <BlockTopLeft _top={170} _left={10}>
            <HandleTxIdContext value={handleTxId}>
              {isContractLoaded? <QueuedEvents contract={lockTimesSC}/> : <></>}
            </HandleTxIdContext>
          </BlockTopLeft>
          <BlockTopRight _top={170} _right={10} style={{display: (txId === 'undefined')? 'none' : 'block'}}>
            <TxData txId={txId} contract={lockTimesSC}/>
          </BlockTopRight>
        </BlockShow>
        <BlockShow show={isShowFundSources}>
          <BlockTopRight _top={0} _right={10}>
            <FundSources contractLockTime={lockTimesSC} contractMarketWeapons={marketWeaponsSC}/>
          </BlockTopRight>
        </BlockShow>
        <BlockTopLeft _top={80} _left={10}>
          <FormAccount handleSetAccount={handleSetAccount}/>
        </BlockTopLeft>
      </header>
    </div>
  );
}

export default SC_Page;
