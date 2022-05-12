import React, {useRef} from 'react';
import './button.css'
// import Button from '@mui/material/Button';
// import { makeStyles } from '@mui/styles';

const ButtonComponent = ({
        children,
        handleClick = () => { },
        cl,
        sz,
        stylex,
        btntype,
        btnform,
        name,
        ...props
    }) => {
        return (
            <button onClick={handleClick} type={btntype} form={btnform} name={name}  className={`Button ${cl}`} {...props}  >
                {children}
            </button>

            // <Button size={sz} sx={{ fontSize: '10pt', ...stylex }} onClick={handleClick} className={`Button ${cl}`} {...props} variant="contained">{children}</Button>
        )
}
export default ButtonComponent;