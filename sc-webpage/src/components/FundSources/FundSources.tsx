import React, { FC, useState, useEffect } from "react";
import { Contract } from "ethers";
import { FundSourcesWrapper } from "./FundSources.styled";
import { ButtonWrapper } from "../styles/standard.styled";
import { BlockTopRight } from "../styles/standard.styled";

interface IContract {
    contractLockTime: Contract | null;
    contractMarketWeapons: Contract | null;
}

const FundSources: FC<IContract> = (props) => {
    const [depositBalance, setDepositBalance] = useState<number>(0);
    const [contractBalance, setContactBalance] = useState<number>(0);
    const [walletBalance, setWalletBalance] = useState<number>(0);

    const handleBalances = async() => {
        setDepositBalance(await props.contractLockTime?.getBalance());
        setContactBalance(await props.contractMarketWeapons?.getContractBalance());
        setWalletBalance(await props.contractMarketWeapons?.getOwnerBalance());
        // console.log('deposit', depositBalance);
    }

    const handleWithdraw = async() => {
        try{
            await props.contractMarketWeapons?.withdrawToWallet();
            await handleBalances();
        }
        catch (error){
            console.log('error handleWithdraw', error);
        }
    }

    useEffect(()=>{
        handleBalances();
    }, [depositBalance, contractBalance, walletBalance])

    return(
        <FundSourcesWrapper>
            <p>FUNDS BALANCE</p>
            <tr>
                <th>DEPOSIT Wei</th>
                <th>CONTRACT Wei</th>
                <th>WALLET Wei</th>
            </tr>
            <tr>
                <td>{depositBalance}</td>
                <td style={{textAlign: 'left'}}>{contractBalance}</td>
                <td style={{textAlign: 'right'}}>{walletBalance}</td>
            </tr>
            <BlockTopRight style={{position: 'relative'}} _top={0} _right={-150}>
                <ButtonWrapper color="#1a6613" style={{color: 'whitesmoke'}} onClick={handleWithdraw}>WITHDRAW</ButtonWrapper>
            </BlockTopRight>
            <ButtonWrapper color="#2c58b9" style={{color: 'whitesmoke', top: '-40px', position: 'relative'}} onClick={handleBalances}>RELOAD</ButtonWrapper>
        </FundSourcesWrapper>
    )
}

export default FundSources;