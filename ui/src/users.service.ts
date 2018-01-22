import { Injectable } from '@angular/core';

export interface Player {
    name: string,
    mark: string
}

@Injectable()
export class UsersService {

    /**
     * The player one object
     */
    private playerOne:Player;

    /**
     * The player two object
     */
    private playerTwo:Player;

    /**
     * The mark of the currently active player
     */
    private activePlayer:string;

    constructor() {
        this.playerOne = {name:undefined, mark:undefined};
        this.playerTwo = {name:undefined, mark:undefined};
        this.activePlayer = "x";
    }

    /**
     * A setter for the `activePlayer`
     *
     * @param  player [Optional] The player, either 'x' or 'o' that is currently playing
     * @return        String mark of the active player. Either 'x' or 'o'
     */
    setActivePlayer(player?:string):string {
        if (player) {
            this.activePlayer = player;
            return this.activePlayer;
        }
        return this.activePlayer === "x" ? this.activePlayer = "o" : this.activePlayer = "x";
    }

    /**
     * Getter for `activePlayer`
     *
     * @return String representation of the mark of the active Player
     */
    getActivePlayer():string {
        return this.activePlayer;
    }

    /**
     * Setter for playerOne
     *
     * @param name The string name of the player one player
     */
    setPlayerOne(name):void {
        this.playerOne = {name:name, mark:"x"};
    }

    /**
     * Getter for player one
     *
     * @return The Player object of player one
     */
    getPlayerOne():Player {
        return this.playerOne;
    }

    /**
     * Setter for player two
     *
     * @param name The string name of player two
     */
    setPlayerTwo(name):void {
        this.playerTwo = {name:name, mark:"o"};
    }

    /**
     * Getter for player two
     *
     * @return The Player object of player two
     */
    getPlayerTwo():Player {
        return this.playerTwo;
    }

    /**
     * This method resets the Player objects of both player one and player two
     */
    resetPlayers():void {
        this.playerOne = {name:undefined, mark:"x"};
        this.playerTwo = {name:undefined, mark:"o"};
    }
}
