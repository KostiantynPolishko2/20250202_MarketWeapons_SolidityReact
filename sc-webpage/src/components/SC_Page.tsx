import React, {FC, useState, useEffect} from 'react';
import {Contract} from 'ethers';
import 'the-new-css-reset';
import './SC_Page.css';
import {getMarketWeaponsSC, getContractItem} from './utils/MarketWeaponsSC';
import { getTimeLockSC } from './utils/TimeLockSC';
import ContractItem from './ContractItem/ContractItem';
import { IContractFields } from './ContractItem/ContractItem';
import { BlockTopLeft} from './styles/standard.styled';
import QueuedEvents from './Events/Queued/QueuedEvents';

const SC_Page: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [marketWeaponsSC, setMarketWeaponsSC] = useState<Contract | null>(null);
  const [lockTimesSC, setLockTimeSC] = useState<Contract | null>(null);
  const [contractFields, setContractFields] = useState<IContractFields>();

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
        <BlockTopLeft _top={90} _left={10}>
          <QueuedEvents contract={lockTimesSC}/>
        </BlockTopLeft>
      </header>
    </div>
  );
}

export default SC_Page;
