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
                <h4>owner:</h4>
                <h4>{props?._owner || 'undefined'}</h4>
            </div>
            <div className="flex-container">
                <h4>contract:</h4>
                <h4>{props?._item || 'undefined'}</h4>
            </div>
            <div className="flex-container">
                <h4>times:</h4>
                <h4>{dateTime}</h4>
            </div>
        </ContractItemWrapper>
    );
}

export default ContractItem;