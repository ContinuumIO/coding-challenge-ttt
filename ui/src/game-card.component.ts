import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EventService } from './event.service';
import { GameService } from './game.service';

@Component({
    selector: 'game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

    @Input() game:any;

    /**
     * Array of players for this game
     */
    players:Array<string>;

    /**
     * The name of player one
     */
    playerOne:string;

    /**
     * The mark player one used. Either 'x' or 'o'
     */
    playerOneMark:string;

    /**
     * The name of player two
     */
    playerTwo:string;

    /**
     * The mark player two used. Either 'x' or 'o'
     */
    playerTwoMark:string;

    /**
     * The string to display in the component DOM the players of the game
     */
    playerTitle:string;

    /**
     * The array of tiles and their states for this saved game
     */
    gameBoard:Array<string>;

    constructor(private router:Router,
                private eventService:EventService,
                private gameService:GameService) {

    }

    ngOnInit():void {

        // If the game Input has a `title` property then this card is not a saved
        // game but simply and entry point to start a new game
        if (this.game.hasOwnProperty('title')) {
            this.players = [];
            this.playerTitle = this.game.title;
        } else {
        // If not `title` property exists, then the game Input data is from a
        // saved game and set all the necessary variable fr displaying the saved
        // game data in this card
            this.players = this.game.attributes.players;
            this.playerOne = this.game.attributes.players[0].name;
            this.playerOneMark = this.game.attributes.players[0].mark;
            this.playerTwo = this.game.attributes.players[1].name;
            this.playerTwoMark = this.game.attributes.players[1].mark;
            this.playerTitle = this.playerOne + " vs " + this.playerTwo;
            this.gameBoard = this.game.attributes.board;
        }
    }

    /**
     * This is the click handler for the cards that hold data for a saved game.
     * The game id stored in the gameService and the route is changed.
     */
    playGame():void {
        this.gameService.setSelectedGame(this.game.id);
        this.router.navigate(['play']);
    }

    /**
     * This is the click handler for the game card that is used to start a fresh
     * new game
     */
    startNewGame():void {
        this.eventService.dispatch({event:'newGame'});
    }

}
