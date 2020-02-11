import React, { Component } from 'react';
import FreshStart from './FreshStart';

class Game extends Component {

    constructor(){
        super();
        this.tableHeight = 6;
        this.tableWidth = 7;
        this.numberOfConnection = 4;

        this.initialState = {
            // Game Modes: 0- App started, 1- Game ongoing, 2- Game over
            gameMode: 0,
            // Player Color: 0- Red, 1- Yellow
            playerTurn: null,
            // Slot values in Board: -1- Empty, 0- Red, 1- Yellow
            // 7x6 Table Data
            board: Array(this.tableHeight).fill(-1).map(row => new Array(this.tableWidth).fill(-1))
        }
        this.state = this.initialState;
    }

    colorSelected(firstPC){
        this.setState({
            gameMode: 1,
            playerTurn: firstPC
        }, function(){
                //console.log("FPC selected: " + this.state.playerTurn + " (0: Red, 1: Yellow)");
                //console.log(this.state.board);
        });
    }

    slotClicked(column){
        if(this.state.gameMode === 2){
            return;
        }

        for(let i = this.state.board.length - 1; i > -1; i--){
            if(this.state.board[i][column] === -1){
                let id = "s" + i + column;

                if(this.state.playerTurn === 0)
                    this.refs[id].style.background = "red";
                else
                    this.refs[id].style.background = "yellow";

                this.setState({ playerTurn: 1 - this.state.playerTurn });
                
                let board = this.state.board;
                board[i][column] = this.state.playerTurn;
                this.setState({board: board}, function(){
                    this.checkBoard(i, column);
                });
                
                break;
            }
        }
        //console.log("Clicked: [" + row + ", " + column + "]");
        //console.log("Updated Board:");
        //console.log(this.state.board);
    }

    getTable(){
        return this.state.board.map((row, rowIndex) => {
            return (
                <tr key={"r" + rowIndex}>
                    {row.map((column,columnIndex) => {
                        let id = rowIndex.toString() + columnIndex.toString();
                        return (<td ref={"s" + id} key={"s" + id} className="Slot" onClick={() => {this.slotClicked(columnIndex)}}></td>)
                        })}
                </tr>
            );
        });
    }

    reset(){
        let board = Array(this.tableHeight).fill(-1).map(row => new Array(this.tableWidth).fill(-1));
        this.setState(this.initialState);
        this.setState({board: board});
    }

    checkBoard(row, column){
        let connected = 0;
        let toBeConnected = this.numberOfConnection - 1;
        
        // number of the slots to be checked, to the directions...
        let up = row > toBeConnected ? toBeConnected : row;
        let down = this.tableHeight - row - 1 < toBeConnected ? this.tableHeight - 1 - row : toBeConnected;
        let left = column > toBeConnected ? toBeConnected : column;
        let right = this.tableWidth - column - 1 < toBeConnected ? this.tableWidth - 1 - column: toBeConnected;
        let top_left = Math.min(left, up);
        let bottom_right = Math.min(right, down);
        let top_right = Math.min(up, right);
        let bottom_left = Math.min(down, left);
        //console.log("l: " + left + ", r: " + right + ", u: " + up + ", d: " + down);
        //console.log("tl: " + top_left + ", tr: " + top_right + ", bl: " + bottom_left + ", br: " + bottom_right);

        // Check horizontal
        for(let i = 0; i < left + right + 1; i++){
            if (this.state.board[row][column - left + i] === 1 - this.state.playerTurn) {
                connected++;
            } else {
                connected = 0;
            }

            if (connected === this.numberOfConnection) { this.endGame() };
        }
        
        // Check vertical
        connected = 0;
        for (let i = 0; i < up + down + 1; i++) {
            if (this.state.board[row - up + i][column] === 1 - this.state.playerTurn) {
                connected++;
            } else {
                connected = 0;
            }

            if (connected === this.numberOfConnection) { this.endGame() };
        }

        // Check diagonal from top-left to bottom-right
        connected = 0;
        for(let i = 0; i < top_left + bottom_right + 1; i++){
            if (this.state.board[row - top_left + i][column - top_left + i] === 1 - this.state.playerTurn) {
                connected++;
            } else {
                connected = 0;
            }

            if (connected === this.numberOfConnection) { this.endGame() };
        }

        // Check diagonal from top-right to bottom-left
        connected = 0;
        for (let i = 0; i < top_right + bottom_left + 1; i++) {
            if (this.state.board[row - top_right + i][column + top_right - i] === 1 - this.state.playerTurn) {
                connected++;
            } else {
                connected = 0;
            }

            if (connected === this.numberOfConnection) { this.endGame() };
        }

    }

    endGame(){
        this.setState({gameMode: 2});
    }

    render() {
        if(this.state.gameMode === 0){
            return (<FreshStart ColorSelected={this.colorSelected.bind(this)} />);
        }else{
            let buttonText;
            if(this.state.gameMode === 1)
                buttonText = "Restart Game";
            else{
                let winner;
                if(this.state.playerTurn === 0)
                    winner = "Yellow";
                else
                    winner = "Red";

                buttonText = winner + " won! Click here to restart!";
                this.refs.button.style.background = winner;
            }
            return (
                <div>
                    <table id="Board">
                        <tbody>
                            {this.getTable()}
                            <tr>
                                <td ref="button" id="resetButton" colSpan={this.tableWidth} onClick={() => {this.reset()}}>{buttonText}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Game;
