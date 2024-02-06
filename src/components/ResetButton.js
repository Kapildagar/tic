import React from 'react';

import "./ResetButton.css";

export const ResetButton = ({ resetBoard,value }) => {
    console.log(value)
    return (
        <button className="reset-btn" onClick={resetBoard}>{value}</button>
    )
}

