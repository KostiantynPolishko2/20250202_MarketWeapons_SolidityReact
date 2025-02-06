import React, { FC } from "react";
import { FundSourcesWrapper } from "./FundSources.styled";
import { ButtonWrapper } from "../styles/standard.styled";
import { BlockTopRight } from "../styles/standard.styled";

const FundSources: FC = () => {
    return(
        <FundSourcesWrapper>
            <p>FUNDS BALANCE</p>
            <tr>
                <th>DEPOSIT</th>
                <th>CONTRACT</th>
                <th>WALLET</th>
            </tr>
            <tr>
                <td>...</td>
                <td style={{textAlign: 'left'}}>...</td>
                <td style={{textAlign: 'right'}}>...</td>
            </tr>
            <BlockTopRight style={{position: 'relative'}} _top={0} _right={-90}>
                <ButtonWrapper color="#1a6613" style={{color: 'whitesmoke'}}>WITHDRAW</ButtonWrapper>
            </BlockTopRight>
        </FundSourcesWrapper>
    )
}

export default FundSources;