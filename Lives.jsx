import React from "react";

const Lives = ({ attempts }) => {
 
    return (
        <>
        <img src="assets/lives.png" id="lives" />
        <p id="numberLives">x{attempts}</p>
        </>
    );
};

export default Lives;