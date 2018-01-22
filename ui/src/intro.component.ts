import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService } from './utils.service';
import { ApiService } from './api.service';
import { UsersService } from './users.service';
import { EventService } from './event.service';
import { GameService } from './game.service';

@Component({
    selector: 'intro',
    templateUrl: './intro.component.html',
    styleUrls: ['intro.component.scss']
})
export class IntroComponent implements OnInit, OnDestroy {

    /**
     * A flag to declare if a new game is going to start
     */
    newGame:boolean;

    /**
     * The object to store the data for the game-card component to start a new game
     */
    newGameObj:object;

    /**
     * The name of playerOne
     */
    playerOneName:string;

    /**
     * The name of playerTwo
     */
    playerTwoName:string;

    /**
     * The local store of the list of saved games
     */
    gameList:Array<any>;

    /**
     * A variable to hold a reference ot the event listener
     */
    eventListener:any;

    /**
     * A variable to hold a reference to the event listener
     */
    apiListener:any;

    constructor(private apiService:ApiService,
                private utilsService:UtilsService,
                private usersService:UsersService,
                private router:Router,
                private eventService:EventService,
                private gameService:GameService) {

        this.playerOneName = undefined;
        this.playerTwoName = undefined;
        this.newGame = false;
        this.newGameObj = {
            title: 'Start New Game'
        }
    }

    ngOnInit():void {
        this.eventListener = this.eventService.handle().subscribe(event => {
            if(event.event === 'newGame') {
                this.startNewGame();
            }
        });
        this.getListOfGames();
        this.newGame = false;
    }

    /**
     * This method is called upon component initialization to query for the list of
     * saved games. If a one or more saved games were returned, we store a copy local
     * to this component and to the gameService.
     */
    getListOfGames():void {
        this.apiListener = this.apiService.getGames().subscribe(response => {
            this.gameList = response['data'];
            this.gameService.gameList = response['data'];
        }
        ,err => {
            // this is a sweet spot for error handling, if you're into that kind of thing
        });
    }

    /**
     * This method is the handler for taking the name input for playerOne and
     * storing it.
     *
     * @param name The name entered by player one
     */
    savePlayerOne(name):void {
        this.usersService.setPlayerOne(name);
    }

    /**
     * This method is the handler for taking the name input for playerTwo and
     * storing it.
     *
     * @param name The name entered by player two
     */
    savePlayerTwo(name):void {
        this.usersService.setPlayerTwo(name);
    }

    /**
     * This method simply navigates to the /play route to start the play of the game
     */
    startGame():void {
        this.router.navigate(['play']);
    }

    /**
     * This method sets the `newGame` variable to TRUE to declare a new game is
     * going to start
     */
    startNewGame():void {
        this.newGame = true;
    }

    ngOnDestroy():void {
        this.eventListener.unsubscribe();
        this.apiListener.unsubscribe();
    }

}
