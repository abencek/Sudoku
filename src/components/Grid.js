import React from 'react';
//Components
import Cell from './Cell';
//Styles
import './Grid.css'


function Grid (props) {
    
    //Create grid cells
    const elements =  props.grid.map((value1, index1)=>
        value1.map((value2,index2)=>{
            let position=[index1,index2];
            return (<Cell 
                        key={position} 
                        value={value2} 
                        position={position} 
                        changeHandler={props.changeHandler} 
                     />)
        })
    )
    
    return (
        <div className="game-grid" style={props.gameIsPlaying?null:{pointerEvents:'none'}}>
            <ul>
                {elements}
            </ul>
        </div>
    )
    
}

export default Grid;





