import './_variables.scss';
import './index.scss';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { EventService } from './event.service';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';
import { GameService } from './game.service';
import { UsersService } from './users.service';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    /**
     * A flag to declare that the current route is indeed the /play route. Used
     * for DOM manipulation.
     */
    playRoute:boolean;

    constructor(private eventService:EventService,
                private utilsService:UtilsService,
                private apiService:ApiService,
                private gameService:GameService,
                private usersService:UsersService,
                private router:Router) {

                    this.playRoute = false;
    }

    ngOnInit():void {
        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                if (event.url === '/play') {
                    this.playRoute = true;
                } else {
                    this.playRoute = false;
                }
            }
        });

    }

    /**
     * The click handler for the 'restart game' button
     * This method dispatched an event to reset the game
     */
    resetGame():void {
        this.eventService.dispatch({event:'resetGame'});
    }

    /**
     * The click handler for the 'new game' button.
     * This method dispatched an event to start a new game.
     */
    newGame():void {
        this.eventService.dispatch({event:'newGame'});
    }

    /**
     * The click handler for the 'save game' button
     * This method takes the needed game data for saving the current game and then
     * posts to the API to save.
     */
    saveGame():void {
        let data = {
            "_id": this.gameService.getSelectedGame() || this.utilsService.generateUid(),
            "players": [this.usersService.getPlayerOne(), this.usersService.getPlayerTwo()],
            "board": this.gameService.getGameBoard()
        };
        this.apiService.saveGame(data).subscribe(response => {

        }
        ,err => {
            // handle error here in the near future ... naw, not really
        });
    }

}
