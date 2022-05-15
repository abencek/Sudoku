import React from 'react';
//Components
import Header from './Header'
import Grid from './Grid'
//Utils
import Solver from '../utils/Solver';
import GridManager from '../utils/GridManager'
//Styles
import './Game.css';


class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            displayGrid : [],
            headerTextType : 1,
            disabledButtons:[false, false, false]
        }

        // Initial sudoku
        this.grid = [
            [7,8,0,4,0,0,1,2,0],
            [6,0,0,0,7,5,0,0,9],
            [0,0,0,6,0,1,0,7,8],
            [0,0,7,0,4,0,2,6,0],
            [0,0,1,0,5,0,9,3,0],
            [9,0,4,0,6,0,0,0,5],
            [0,7,0,3,0,0,0,1,2],
            [1,2,0,0,0,7,4,0,0],
            [0,4,9,2,0,6,0,0,7]
        ]

        this.gridManager = new GridManager();

        // Initialize displayGrid. Final grid contains puzzle values and other formatting metadata
        this.state.displayGrid = this.createDisplayGrid (this.grid);

        //Methods binding section
        this.createDisplayGrid = this.createDisplayGrid.bind(this);
        this.updateDisplayGrid = this.updateDisplayGrid.bind(this);
        this.resetWrongGuessedValuesFromGrid = this.resetWrongGuessedValuesFromGrid.bind(this);
        this.isGameSolved= this.isGameSolved.bind(this);
        this.handleClickNewGame = this.handleClickNewGame.bind(this);
        this.handleClickStartGame = this.handleClickStartGame.bind(this);
        this.handleClickSolveGame = this.handleClickSolveGame.bind(this);
        this.handleChangeGridCell = this.handleChangeGridCell.bind(this);

    }

    //Create grid with default settings
    createDisplayGrid (baseGrid) {
        //Loop grid rows
        const newGrid = baseGrid.map((val1)=>{
            //Loop row array
            return val1.map((val2)=>{
                return {
                    value: (val2===0) ? '' : val2, 
                    readOnly:(val2===0) ? false : true,
                    className: ''
                }
            })
        })
        return newGrid;
    }

    //Update formatting metadata
    updateDisplayGrid(x,y,value,isValid){
        let grid = this.state.displayGrid.slice();

        grid[x][y].value = value;
        grid[x][y].className = (isValid) ? '' :'error';
        
        this.setState({displayGrid: grid});
    }

    //Reset wrong user inputs before grid is solved automatically
    resetWrongGuessedValuesFromGrid(){
        const newGrid = this.state.displayGrid.map(
            (val1, idx1) => val1.slice().map(
                (val2, idx2) => { 
                    if(val2.className==='') {
                        return {...val2};
                    }
                    else {
                        this.grid[idx1][idx2]= 0;
                        return {...val2, value: 0, className: ''} 
                    } 
                }
            )
        );

        this.setState({displayGrid: newGrid});
    }

    isGameSolved() {
        return !this.state.displayGrid.some(val1=>
            val1.some(val2=>val2.value==='' || val2.className==='error'));
    }


    //Event handlers section

    handleClickStartGame() {
        this.setState({
            headerTextType:3,
            disabledButtons:[true,false,false]
        });
    }


    handleClickNewGame() {

        const createNewGrid = (isEmpty) => {
            if(isEmpty){
                this.grid = this.gridManager.createEmptyGrid();
            }
            else{
                this.grid = this.gridManager.createGridForGame();
            }
            const displayGrid = this.createDisplayGrid(this.grid);
            this.setState({displayGrid});
        }

        //Set header
        this.setState({
            headerTextType:1,
            disabledButtons:[false,false,false]
        });

        createNewGrid.call(this, true);
        window.setTimeout(()=>{createNewGrid.call(this, false)}, 500); //delay for animation effect
       
    }


    handleClickSolveGame(){

        this.resetWrongGuessedValuesFromGrid();

        let counter=1;

        Solver.onValueChange = (position,value)=>{
            //If position is null, game is solved and new header will be set
            if(position===null){  
                setTimeout(()=>{
                    this.setState({
                        headerTextType:4,
                        disabledButtons:[true,true,false]
                    });
                    }, 50*(counter + 5)); 
                return;
            }   

            const [x,y]=position;
            setTimeout(()=>
                this.updateDisplayGrid(
                    x, 
                    y, 
                    value===0 ? '' : value, 
                    value===0 ? false : true),
            50 * counter++) 
        };

        //Set header
        this.setState({
            headerTextType:2,
            disabledButtons:[true,true,true]
        });
        Solver.solve(this.grid);
        Solver.onValueChange = null;

    }


    handleChangeGridCell(position, valueAsString) {

        const [x,y] = position;
        const value = isNaN(parseInt(valueAsString)) ? '' : parseInt(valueAsString);
        const isValid = Solver.valid(this.grid, value, position);

        this.grid[x][y] =(value==='') ? 0 : value;
        this.updateDisplayGrid(x,y,value,isValid);

        //Set header
        if(this.isGameSolved()){
            this.setState({
                headerTextType:4,
                disabledButtons:[true,true,false]
            });
        };
 
    }

  
    render(){
        return ( 
            <main>
                <Header headerTextType={this.state.headerTextType} />
                <section>
                    <div className="game-buttons">
                        <button
                            disabled={this.state.disabledButtons[0]}
                            onClick={this.handleClickStartGame}>Start Game</button> 
                        <button
                            disabled={this.state.disabledButtons[1]}
                            onClick={this.handleClickSolveGame}>Solve Game</button>  
                        <button 
                            disabled={this.state.disabledButtons[2]}
                            onClick={this.handleClickNewGame}>New Game</button> 
                    </div> 
                    <Grid 
                        grid={this.state.displayGrid} 
                        changeHandler={this.handleChangeGridCell} 
                        gameIsPlaying={this.state.headerTextType===3}
                    />
                </section>
            </main>
        )
    }
}

export default Game;





