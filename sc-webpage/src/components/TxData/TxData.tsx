import React, {FC, useState, useEffect} from "react";
import { Contract } from "ethers";
import { TxDataWrapper } from "./TxData.styled";
import '../styles/standard.css';
import { getTxDataByID, executeTxById, discardTxById } from "../utils/TimeLockSC";
import { ButtonWrapper } from "../styles/standard.styled";

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
    const [txId, setTxId] = useState<string>('');

    const handleTxData = async()=>{
        setTxData(await getTxDataByID(props.txId, props.contract));
        // console.log('txData', txData);
    }

    const handleExecuteTxById = async(e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setTxId(e.currentTarget.parentElement?.previousElementSibling?.firstElementChild?.nextElementSibling?.textContent || 'undefined');
        // console.log('execute txId', txId);
        await executeTxById(txId, props.contract) && setTxData(null);
    }

    const handleDiscardTxById = async(e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setTxId(e.currentTarget.parentElement?.previousElementSibling?.firstElementChild?.nextElementSibling?.textContent || "undefined");
        // console.log('discard txId', txId);
        await discardTxById(txId, props.contract) && setTxData(null);
    }

    useEffect(()=>{
        handleTxData();
    }, [props.txId]);

    if (txData === null || txId === ''){
        return (
        <TxDataWrapper>
            <p>Transaction Data</p>
            <div className="flex-container">
                <h4 className="tx-overflow">{props.txId}</h4>
                {props.txId == 'undefined' ? <></> : <h4>deleted / executed</h4>}           
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
                <ButtonWrapper color="red" onClick={handleExecuteTxById}>execute</ButtonWrapper>
                <ButtonWrapper color="orange" onClick={handleDiscardTxById}>discard</ButtonWrapper>
            </div>
        </TxDataWrapper>
    )
}

export default TxData;