import React, {FC, useState, useEffect} from "react";
import { Contract } from "ethers";
import { TxDataWrapper } from "./TxData.styled";
import '../styles/standard.css';
import { getTxDataByID } from "../utils/TimeLockSC";

interface ITxDataFields {
    client: string,
    value: number,
    func: string,
    productName: string,
    sum: number,
}

export interface ITxId {
    txId: string,
    contract: Contract | null,
}

export const TxData: FC<ITxId> = (props)=> {

    const [txData, setTxData] = useState<ITxDataFields | null>(null);

    const handleTxData = async()=>{
        setTxData(await getTxDataByID(props.txId, props.contract));
        console.log('txData', txData);
    }

    useEffect(()=>{
        handleTxData();
    }, [props.txId]);

    if (txData == null){
        return (<></>)
    }

    return(
        <TxDataWrapper>
            <p>Transaction Data</p>
            <div className="flex-container">
                <h4>client:</h4>
                <h4>{txData?.client || 'already executed'}</h4>
            </div>
            <div className="flex-container">
                <h4>value:</h4>
                <h4>{txData?.value || 'already executed'}</h4>
            </div>
            <div className="flex-container">
                <h4>function:</h4>
                <h4>{txData?.func || 'already executed'}</h4>
            </div>
            <div className="flex-container">
                <h4>product:</h4>
                <h4>{txData?.productName || 'already executed'}</h4>
            </div>
            <div className="flex-container">
                <h4>sum:</h4>
                <h4>{txData?.sum || 'already executed'}</h4>
            </div>
        </TxDataWrapper>
    )
}

export default TxData;