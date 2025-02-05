import React, {FC} from "react";
import { ContractItemWrapper } from "./ContractItem.styled";
import '../styles/standard.css';

export interface IContractFields{
    _owner: string | undefined,
    _item: string | undefined,
    _time: number | undefined,
}

const ContractItem: FC<IContractFields> = (props) => {

    const dateTime = new Date(Number(props?._time || 0)*1000).toLocaleString();

    return(
        <ContractItemWrapper>
            <div className="flex-container">
                <h3>owner:</h3>
                <h3>{props?._owner || 'undefined'}</h3>
            </div>
            <div className="flex-container">
                <h3>contract:</h3>
                <h3>{props?._item || 'undefined'}</h3>
            </div>
            <div className="flex-container">
                <h3>times:</h3>
                <h3>{dateTime}</h3>
            </div>
        </ContractItemWrapper>
    );
}

export default ContractItem;