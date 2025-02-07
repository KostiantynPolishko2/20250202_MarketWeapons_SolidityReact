import React, { FC, FormEvent, FormHTMLAttributes, useState } from "react";
import { FormAccountWrapper, ButtonAuth } from "./FormAccount.styled";
import '../styles/standard.css';

export interface IAccount {
    account: string,
    privateKey: string,
}

interface IHandleAccount {
    handleSetAccount: (_account: string, _privateKey: string)=>void,
}

const FormAccount: FC<IHandleAccount> = (props) => {

    const [isDisable, setIsDisable] = useState<boolean>(false);

    const handleAuth = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const _account: string = (e.currentTarget.previousElementSibling?.previousElementSibling?.lastElementChild as HTMLInputElement).value.toString();
        const _privateKey: string = (e.currentTarget.previousElementSibling?.lastElementChild as HTMLInputElement).value.toString();
        const _form  = e.currentTarget.parentElement as HTMLFormElement | null;
        _form?.reset();
        // setIsDisable(true);
        props.handleSetAccount(_account, _privateKey);
    }

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
            <ButtonAuth isDisable={isDisable} disabled={isDisable} onClick={handleAuth}>AUTH</ButtonAuth>
        </FormAccountWrapper>
    )
}

export default FormAccount;