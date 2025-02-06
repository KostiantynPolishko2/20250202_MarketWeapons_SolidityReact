import React, {FC, useState, useEffect, createContext} from 'react';
import {Contract} from 'ethers';
import 'the-new-css-reset';
import './SC_Page.css';
import {getMarketWeaponsSC, getContractItem} from './utils/MarketWeaponsSC';
import { getTimeLockSC } from './utils/TimeLockSC';
import ContractItem from './ContractItem/ContractItem';
import { IContractFields } from './ContractItem/ContractItem';
import { BlockTopLeft, BlockTopRight} from './styles/standard.styled';
import QueuedEvents from './Events/Queued/QueuedEvents';
import TxData from './TxData/TxData';
import FundSources from './FundSources/FundSources';

export const HandleTxIdContext = createContext((e: React.FormEvent<HTMLElement>):void=>{});

const SC_Page: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [marketWeaponsSC, setMarketWeaponsSC] = useState<Contract | null>(null);
  const [lockTimesSC, setLockTimeSC] = useState<Contract | null>(null);
  const [contractFields, setContractFields] = useState<IContractFields>();
  const [txId, setTxId] = useState<string>("undefined");

  const setUpMWSC = async () => {
    setMarketWeaponsSC(await getMarketWeaponsSC());
  }

  const handleLTSC = async () => {
    setLockTimeSC(await getTimeLockSC());
    // console.log(lockTimesSC);
  }
  
  const handleContractItem = async () => {
    setContractFields(await getContractItem(marketWeaponsSC));
    setIsLoaded(true);
  }

  const handleTxId = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setTxId(e.currentTarget.firstElementChild?.nextElementSibling?.textContent || "undefined");
    console.log('rows events', e.currentTarget.firstElementChild?.nextElementSibling?.textContent);
  }

  useEffect(() => {
    setUpMWSC();  // init entity of MarketWeapons.sol
    handleLTSC();  // init entity of TimeLock.sol
    handleContractItem();
  }, [isLoaded]);

  return (
    <div className="SC_App">
      <header className="SC_App-header">
        <BlockTopLeft _top={0} _left={10}>
          <ContractItem _owner={contractFields?._owner} _item={contractFields?._item} _time={contractFields?._time}/>
        </BlockTopLeft>
        <BlockTopLeft _top={140} _left={10}>
          <HandleTxIdContext value={handleTxId}>
            <QueuedEvents contract={lockTimesSC}/>
          </HandleTxIdContext>
        </BlockTopLeft>
        <BlockTopRight _top={140} _right={10}>
          <TxData txId={txId} contract={lockTimesSC}/>
        </BlockTopRight>
        <BlockTopRight _top={0} _right={10}>
          <FundSources/>
        </BlockTopRight>
      </header>
    </div>
  );
}

export default SC_Page;
