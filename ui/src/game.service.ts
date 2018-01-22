import { Injectable } from '@angular/core';

import { EventService } from './event.service';

@Injectable()
export class GameService {

    /**
     * A flag to declare that a saved game is reloading
     */
    loadingSavedGame:boolean;

    /**
     * An array to store the list of saved games
     */
    gameList:Array<object>;

    /**
     * An array to store the state of the game
     */
    private gameBoard:Array<string>;

    /**
     * The id of the active game if the game has an assigned id
     */
    private activeGame:string;

    constructor(private eventService:EventService) {
        // initialize the 3x3 game board
        this.gameBoard = [
            null,null,null,
            null,null,null,
            null,null,null,
        ];
        this.activeGame = null;
        this.loadingSavedGame = false;
    }

    /**
     * A setter for `activeGame`
     *
     * @param id The string is of the selected game
     */
    setSelectedGame(id:string):void {
        this.activeGame = id;
    }

    /**
     * Getter for retrieving the selectedGame's id
     *
     * @return The id of the active game
     */
    getSelectedGame():string {
        return this.activeGame;
    }

    /**
     * Getter to return the state of the gameboard
     *
     * @return An array of the current state of tiles in the gamesboard
     */
    getGameBoard():Array<any> {
        return this.gameBoard;
    }

    /**
     * This method nulls out the state of the gameBoard tiles
     */
    resetGameBoard():void {
        this.gameBoard = [
            null,null,null,
            null,null,null,
            null,null,null,
        ];
    }

    /**
     * This method takes the tile object passed into it and updates the gameBoard
     * with the same tile to that state. It will be either set to 'x' or 'o'
     *
     * @param  tile The tile object of the tile we are updating
     */
    updateGameBoard(tile) {
        this.gameBoard[tile.id-1] = tile.player;
        if (!this.loadingSavedGame){
            this.gameStatus();
        }

    }

    /**
     * This is uglier than sin but due to time constraints this is what I came up with.
     * Check for null values first then check if the values in each row, column or
     * diagnol are equal. If one of those combination is TRUE, call win(). If none
     * are true and all tiles are activated call draw();
     *
     * I think a better solution, if time permitted, might have been to have an array
     * with all the possible win states and then compare that array with the state of the
     * `gameBoard` array to determine if it was a win or draw.
     */
    gameStatus():void {
        // test for horizontal wins
        if ((this.gameBoard[0] !== null && this.gameBoard[1] !== null && this.gameBoard[2] !== null)&&
            (this.gameBoard[0] === this.gameBoard[1]) && (this.gameBoard[1] === this.gameBoard[2])) {
            this.win(this.gameBoard[0],[0,1,2]);
        } else if ((this.gameBoard[3] !== null && this.gameBoard[4] !== null && this.gameBoard[5] !== null) &&
                    (this.gameBoard[3] === this.gameBoard[4]) && (this.gameBoard[4] === this.gameBoard[5])) {
            this.win(this.gameBoard[3],[3,4,5]);
        } else if ((this.gameBoard[6] !== null && this.gameBoard[7] !== null && this.gameBoard[8] !== null) &&
                    (this.gameBoard[6] === this.gameBoard[7]) && (this.gameBoard[7] === this.gameBoard[8])) {
            this.win(this.gameBoard[6],[6,7,8]);

        // test for vertical wins
        } else if ((this.gameBoard[0] !== null && this.gameBoard[3] !== null && this.gameBoard[6] !== null) &&
                    this.gameBoard[0] === this.gameBoard[3] && this.gameBoard[3] === this.gameBoard[6]) {
            this.win(this.gameBoard[0],[0,3,6]);
        } else if ((this.gameBoard[1] !== null && this.gameBoard[4] !== null && this.gameBoard[7] !== null) &&
                    this.gameBoard[1] === this.gameBoard[4] && this.gameBoard[4] === this.gameBoard[7]){
            this.win(this.gameBoard[1],[1,4,7]);
        } else if ((this.gameBoard[2] !== null && this.gameBoard[5] !== null && this.gameBoard[8] !== null) &&
                    this.gameBoard[2] === this.gameBoard[5] && this.gameBoard[5] === this.gameBoard[8]) {
            this.win(this.gameBoard[2],[2,5,8]);

        // test for diagnols
        } else if ((this.gameBoard[4] !== null && this.gameBoard[0] !== null && this.gameBoard[8] !== null) &&
                    this.gameBoard[4] === this.gameBoard[0] && this.gameBoard[4] === this.gameBoard[8]) {
            this.win(this.gameBoard[4],[0,4,8]);
        } else if ((this.gameBoard[4] !== null && this.gameBoard[2] !== null && this.gameBoard[6] !== null) &&
                    this.gameBoard[4] === this.gameBoard[2] && this.gameBoard[4] === this.gameBoard[6]) {
            this.win(this.gameBoard[4],[2,4,6]);

        // Test for a draw
        } else if (this.gameBoard.indexOf(null) === -1){
            this.draw();
        }

    }

    /**
     * This method handles a win on the gameBoard by dispatching an event to the
     * registered listener.
     *
     * @param player The player who won
     * @param tiles  The tiles that are in the winning series.
     */
    win(player, tiles):void {
        this.eventService.dispatch({event:'gameOver',player:player,tiles:tiles});
    }

    /**
     * This method handles a draw on the gameBoard by dispatching an event to the
     * registered listener.
     */
    draw():void {
        this.eventService.dispatch({event:'draw'});
    }
}
