import React, {FC, useState} from "react";
import { ErrorWrapper } from "./Error.styled";
import { ISize} from "./Error.styled";
import error404 from "../../assets/images/404.png"

const Error404: FC<ISize> = (props) => {

    return(
        <ErrorWrapper size={{width: props.width, height: props.height}} _url={error404}>
            <p>ERROR 404</p>
        </ErrorWrapper>
    )
}

export default Error404;