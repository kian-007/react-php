import React from 'react';
import './spinner.css'

const MySpinner = ({loaderStyle, loaderholderStyle }) => {
    return(
        <div style={{...loaderholderStyle}} className="loader-holder">
            <div style={{...loaderStyle}} className="loader"></div>
        </div>
    )
}

export default MySpinner;