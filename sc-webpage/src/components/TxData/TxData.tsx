import React, {FC, useState, useEffect} from "react";
import { Contract } from "ethers";
import { TxDataWrapper } from "./TxData.styled";
import '../styles/standard.css';
import { getTxDataByID } from "../utils/TimeLockSC";
import { ButtonWrapper } from "../styles/standard.styled";
import { executeTxById } from "../utils/TimeLockSC";

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
    const [txId, setTxId] = useState<string | null>(null);

    const handleTxData = async()=>{
        setTxData(await getTxDataByID(props.txId, props.contract));
        console.log('txData', txData);
    }

    const handleExecuteTx = async(e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setTxId(e.currentTarget.parentElement?.previousElementSibling?.firstElementChild?.nextElementSibling?.textContent || null);
        if(txId != null){
            console.log('txId', txId);
            await executeTxById(txId, props.contract) && setTxData(null);
        }
    }

    useEffect(()=>{
        handleTxData();
    }, [props.txId]);

    if (txData == null){
        return (
        <TxDataWrapper>
            <p>Transaction Data</p>
            <div className="flex-container">
                <h4 className="tx-overflow">{props.txId}</h4>
                <h4>'already executed'</h4>
            </div>
        </TxDataWrapper>)
    }

    return(
        <TxDataWrapper>
            <div>
                <p style={{color: "black", float: "left"}}>TxID</p>
                <p className="tx-overflow" style={{backgroundColor: "#5bf58e", color:"black", fontSize: "14px"}}>{props.txId}</p>
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
            </div>
            <div>
                <ButtonWrapper color="red" onClick={handleExecuteTx}>execute</ButtonWrapper>
                <ButtonWrapper color="orange">discard</ButtonWrapper>
            </div>
        </TxDataWrapper>
    )
}

export default TxData;