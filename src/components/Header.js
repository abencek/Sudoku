import React, {useState} from 'react';
import './Header.css'


function Header (props) {

    const [timer, setTimer] = useState(0);
    const [textId, setTextId] = useState(1)

    function updateTimer () {
        setTimeout(()=>setTimer(timer + 1), 1000);
    }

    if(props.headerTextType !== textId) {
        setTimer(0);
        setTextId(props.headerTextType);
    }

    let text = '';
    switch (props.headerTextType) {
        case 1:
            text="Start Game and Play!";
            break;
        case 2:
            text="Sudoku solving is running...";
            break;
        case 3:
            const time = new Date(timer * 1000);
            text = "Elapsed time: "
                + ('0' + time.getMinutes().toString()).slice(-2) + ':'
                + ('0' + time.getSeconds().toString()).slice(-2);
            updateTimer();
            break;
        case 4:
            text="Sudoku has been solved, run new game!";
            break;
        default:
            break;
    }  

    return (
        <header>
            <h1>SUDOKU</h1>
            <p>{text}</p> 
        </header>

    );
    
}

export default Header;





