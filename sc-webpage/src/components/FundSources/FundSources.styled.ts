import styled from "styled-components";

export const FundSourcesWrapper = styled.div`
    background-color:rgb(146, 71, 57);
    margin: 5px;
    padding: 0 5px 5px 5px;
    width: 500px;
    font-size: 16px;
    max-height: 130px;

    & th {
        background-color: rgb(124, 47, 33);
        padding: 3px 6px;
        border: 1px solid darkgrey;
        width: 170px;
    }

    & td {
        background-color: rgb(146, 85, 74);
        padding: 6px;
        border: 1px solid darkgrey;
    }
`