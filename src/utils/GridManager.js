import Solver from './Solver';


export default class GridManager   {

    constructor() {
        this.long = 9; // x and y dimension for main grid
        this.small = 3; // x and y dimension for subgrid
        this.blank = 16; // number of "blank" cells to be solved

        this.grid = this.createEmptyGrid(this.long)
    }

    createGridForGame () {
        //Create default empty grid with requested dimension 
        this.grid = this.createEmptyGrid(this.long);
        //First fill diagonal values for better performance
        this.fillDiagonal();
        //Full grid solving 
        Solver.solve(this.grid);
        //Create final grid for game by removing digits 
        this.removeDigits();  

        return this.grid;
    }

    createEmptyGrid () {
        return Array.from(
            Array(this.long),
            ()=>new Array(this.long).fill(0)
        );
    }


    fillDiagonal() {
        for (let k = 0; k < this.long; k+= this.small) {
            this.fillSmallGrid(k, k, this.getRandomNumber(1,9));
        }  
    }


    fillSmallGrid(x, y, num){
        const iMax = x + this.small;
        const jMax = y + this.small;

        for (let i = x; i < iMax; i++) {
            for (let j = y; j < jMax; j++) {
                if (this.grid[i][j] === 0) {
                    this.grid[i][j] = num;
                    this.fillSmallGrid(x, y, this.getRandomNumber(1,9)); 
                    return;
                }
                else if (this.grid[i][j] === num && !(i === iMax-1 && j === jMax-1)){
                    this.fillSmallGrid(x, y, this.getRandomNumber(1,9)); 
                    return;
                }

            } 
        }
        return;
    }

    //Removed digits will be guessed by player during game
    removeDigits() {
        const cells = this.long * this.long - 1;
        let counter = this.blank;

        do {
            const cell = this.getRandomNumber(0, cells);
            const row = Math.floor(cell / this.long);
            const col = cell % this.long;
            if(this.grid[row][col]!==0){
                this.grid[row][col]=0;
                counter--; 
            }
        } while (counter > 0);
    }

    getRandomNumber(min, max){
        return Math.floor(Math.random()*(max - min + 1)) + min;
    }

}

