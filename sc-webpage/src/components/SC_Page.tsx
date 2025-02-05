import React, {FC, useState, useEffect} from 'react';
import {Contract} from 'ethers';
import 'the-new-css-reset';
import './SC_Page.css';
import {getMarketWeaponsSC, getContractItem} from './utils/MarketWeaponsSC';
import ContractItem from './ContractItem/ContractItem';
import { IContractFields } from './ContractItem/ContractItem';
import { BlockTopLeft } from './styles/standard.styled';

const SC_Page: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [marketWeaponsSC, setMarketWeaponsSC] = useState<Contract | null>(null);
  const [contractFields, setContractFields] = useState<IContractFields>();

  const setUpMWSC = async () => {
    setMarketWeaponsSC(await getMarketWeaponsSC());
  }
  
  const handleContractItem = async () => {
    setContractFields(await getContractItem(marketWeaponsSC));
    setIsLoaded(true);
  }

  useEffect(() => {
    setUpMWSC();
    handleContractItem();
  }, [isLoaded]);

  return (
    <div className="SC_App">
      <header className="SC_App-header">
        <BlockTopLeft _top={0} _left={0}>
          <ContractItem _owner={contractFields?._owner} _item={contractFields?._item} _time={contractFields?._time}/>
        </BlockTopLeft>
      </header>
    </div>
  );
}

export default SC_Page;
