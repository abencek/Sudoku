
export default class Solver  {

    static solve (matrix) {

        var find = this.findEmpty(matrix);
        
        if (find===undefined){
            if (this.onValueChange !== null) {this.onValueChange(null, 0);}
            return true;
        }
        else {
            var row = find[0];
            var col = find[1];
        }
        for (let i = 1; i < 10; i++) {
            if (this.valid(matrix, i, find)){
                matrix[row][col] = i
                if (this.onValueChange !== null) {this.onValueChange([row,col], i);}
                   
                if (this.solve(matrix)) {
                    return true;
                }
    
                matrix[row][col] = 0 ;
                if (this.onValueChange !== null) {this.onValueChange([row,col], 0);}
            }
        }
        return false;
    }
    
    static valid (matrix, num, pos) {
        // Check row
       for(let i = 0; i < matrix[0].length; i++) {
            if (matrix[pos[0]][i] === num && pos[1] !== i){
                return false;
            }
        }
        // Check column
        for(let i = 0; i < matrix.length; i++) {
            if (matrix[i][pos[1]] === num && pos[0] !== i){
                return false;
            }
        }    
        // Check box (box is area of 3x3 cells)
        var box_x = Math.floor(pos[1] / 3)
        var box_y = Math.floor(pos[0] / 3)
        for(let i = box_y * 3; i < box_y * 3 + 3; i++) {
            for(let j = box_x * 3; j < box_x * 3 + 3; j++) {
                if (matrix[i][j] === num && pos[0] !== i && pos[1] !== j){
                    return false;
                }
            }
        }
        return true;
    }
    
    static findEmpty (matrix) {
        
        for (let i=0; i< matrix.length; i++){
            for (let j=0; j < matrix[0].length; j++){
                if (matrix[i][j] === 0){
                    return [i, j]  // row, col
                }
            }
        }
        return undefined;
    }

    static onValueChange (position, value){
            // this event will be set by caller (Game component)
    }
}

