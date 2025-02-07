import React, { FC, useState } from "react";
import { FormAccountWrapper, ButtonAuth } from "./FormAccount.styled";
import { ButtonWrapper as ButtonStd } from "../styles/standard.styled";
import '../styles/standard.css';



const FormAccount: FC = () => {

    const [isDisable, setIsDisable] = useState<boolean>(false);

    return(
        <FormAccountWrapper isDisable={isDisable}>
            <div className="flex-container">
                <label htmlFor='account'>account</label>
                <input type='text' id='account' placeholder="account address" disabled={isDisable} autoFocus={true}/>
            </div>
            <div className="flex-container">
                <label htmlFor='private_key'>key</label>
                <input type='text' id='private_key' placeholder="key address" disabled={isDisable}/>
            </div>
            <ButtonAuth isDisable={isDisable} disabled={isDisable}>AUTH</ButtonAuth>
        </FormAccountWrapper>
    )
}

export default FormAccount;