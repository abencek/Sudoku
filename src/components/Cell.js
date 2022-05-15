import React from 'react';


function Cell (props) {

    //Set Cell properties
    const {value, position, changeHandler} = props;
    
    return (
        <li>
            <input 
                type="text" 
                value={value.value}
                readOnly={value.readOnly}
                tabIndex={value.readOnly ? '-1' : '0'}
                className={value.className}
                onChange={(e)=>{changeHandler(position, e.target.value)}}
            />
        </li>  
    ) 
    
}

export default Cell;