import React from 'react';

const Loading = ({isButton}) => {
    return(
        <div className={(isButton)? "spinner white" : "spinner"}>
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    )
}

export default Loading; 