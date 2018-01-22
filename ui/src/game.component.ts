import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GameCompleteDialogComponent } from './game-complete-dialog.component';

import { UsersService } from './users.service';
import { EventService } from './event.service';
import { GameService } from './game.service';
import { ApiService } from './api.service';

import { Subject } from 'rxjs/Subject';

declare var $:any;

@Component({
    selector: 'game-component',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

    /*
     * The name of the winning player
     */
    winner:string;

    /*
     * The of tile objects
     */
    tiles:Array<any>;

    /*
     * A flag signal the game's completion
     */
    gameComplete:boolean;

    /*
     * A flag to declare the game had a winner
     */
    gameWin:boolean;

    /*
     * A flag to declare the game was a draw
     */
    gameDraw:boolean;

    /*
     * A flag to declare playerOne is currently active
     */
    playerOneActive:boolean;

    /*
     * A flag to declare playerTwo is currently active
     */
    playerTwoActive:boolean;

    /*
     * A reference to the Observable
     */
    eventHandler;

    /*
     * A reference to the Observable
     */
    apiListener;

    constructor(public usersService:UsersService,
                private eventService:EventService,
                private gameService:GameService,
                private router:Router,
                private apiService:ApiService,
                public dialog: MatDialog) {

        this.gameComplete = false;
        this.gameWin = false;
        this.gameDraw = false;
        this.tiles = [
            {id: 1, active: false, player: null, winning: false},
            {id: 2, active: false, player: null, winning: false},
            {id: 3, active: false, player: null, winning: false},
            {id: 4, active: false, player: null, winning: false},
            {id: 5, active: false, player: null, winning: false},
            {id: 6, active: false, player: null, winning: false},
            {id: 7, active: false, player: null, winning: false},
            {id: 8, active: false, player: null, winning: false},
            {id: 9, active: false, player: null, winning: false}
        ];

        this.playerOneActive = true;
        this.playerTwoActive = false;
    }

    ngOnInit():void {
        // register some event listeners
        this.eventHandler = this.eventService.handle().subscribe(event => {
            if (this.gameService.loadingSavedGame) return;

            switch(event.event) {
                case 'resetGame':
                    this.resetGame();
                    break;
                case 'newGame':
                    this.newGame();
                    break;
                case 'gameOver':
                    this.gameOver(event.player, event.tiles);
                    break;
                case 'draw':
                    this.draw();
                    break;
            }
        });

        // check if this route was navigated to from a saved game
        if (this.gameService.getSelectedGame()) {
            this.gameService.loadingSavedGame = true;
            this.apiListener = this.apiService.getGame(this.gameService.getSelectedGame()).subscribe(response => {
                this.usersService.setPlayerOne(response["data"].attributes.players[0].name);
                this.usersService.setPlayerTwo(response["data"].attributes.players[1].name);
                let tmpGameBoard = response["data"].attributes.board;
                this.tiles.forEach(tile => {
                    tile.player = tmpGameBoard[tile.id - 1];
                    tile.active = tmpGameBoard[tile.id - 1] !== null;
                    this.gameStats(tile);
                });
                this.gameService.loadingSavedGame = false;
            },
            err => {
                // handle error here, but not now.
            });
        }

    }

    /**
     * This clears the game board but keeps the same players.
     */
    resetGame():void {
        this.playerOneActive = true;
        this.playerTwoActive = false;
        this.usersService.setActivePlayer('x');
        this.gameComplete = this.gameWin = this.gameDraw = false;
        this.gameService.resetGameBoard();
        this.resetTilesArray();
    }

    /**
     * This clears the game board and clears the players requiring the players
     * to re-enter their names again.
     */
    newGame():void {
        this.gameComplete = this.gameWin = this.gameDraw = false;
        this.usersService.resetPlayers();
        this.resetTilesArray();
        this.gameService.resetGameBoard();
        this.gameService.setSelectedGame(undefined);
        this.router.navigate(['intro']);
    }

    /**
     * This method resets the tile objects in the tiles array back to their
     * default state
     */
    resetTilesArray():void {
        this.tiles = [
            {id: 1, active: false, player: null},
            {id: 2, active: false, player: null},
            {id: 3, active: false, player: null},
            {id: 4, active: false, player: null},
            {id: 5, active: false, player: null},
            {id: 6, active: false, player: null},
            {id: 7, active: false, player: null},
            {id: 8, active: false, player: null},
            {id: 9, active: false, player: null}
        ];
    }

    /**
     * This handles the interactivity with a game board tile. If the tile has not
     * been selected, the tile is set to be `activated` by the active player and
     * the the active player is switched to the next player.
     *
     * @param ev   This is the event dispatched from the tile's click/tap
     * @param tile This is the tile object of the tile
     */
    selectTile(ev,tile):void {
        // If the tile hasn't been played, set it's icon
        if (!tile.active) {
            let player = this.usersService.getActivePlayer();
            tile.active = true;
            tile.player = player;
            ev.target.classList.add('player-icon');
            ev.target.classList.add(player);
            this.usersService.setActivePlayer();
            this.playerOneActive = !this.playerOneActive;
            this.playerTwoActive = !this.playerTwoActive;
        }
        this.gameStats(tile);
    }

    /**
     * The plans for this method were to collect statistics on games.
     *
     * @param tile The tile object that was selected.
     */
    gameStats(tile):void {
        this.gameService.updateGameBoard(tile);
    }

    /**
     * This method will loop through the tiles and change the style of those tiles
     * that were not in the winning series.
     *
     * @param player       The player 'x' or 'o' that won
     * @param winningTiles The array of tiles by tile index in the winning series
     */
    gameOver(player, winningTiles):void {
        this.tiles.forEach((tile, index) => {
            let tileIndex = winningTiles.indexOf(index);
            let match = winningTiles.every(wt => {
                return !(wt === index);
            });
            if (match) {
                $('.tile_'+(index+1)+'.player-icon.'+this.tiles[index].player).removeClass(this.tiles[index].player);
                $('.tile_'+(index+1)+'.player-icon').addClass(this.tiles[index].player+'-loser');
            }

        });

        // This is weird but let's talk it through. In the `selectTile` method,
        // we call setActivePlayer before calling this method. Therefore, the winner
        // might have been established but we switched players. And in that case,
        // this ternary operation needs to grab the not-active player. Make sense? Too bad.
        this.winner = this.usersService.getActivePlayer() === 'x'

                        ? this.usersService.getPlayerTwo().name
                        : this.usersService.getPlayerOne().name;
        this.gameComplete = this.gameWin = true;


        this.openGameCompleteDialog('win');
    }

    /**
     * This method opens the Material Dialog component and displays either the
     * winner's name or that it was a draw.
     *
     * @param conclusion String of either 'win' or 'draw'
     */
    openGameCompleteDialog(conclusion):void {
        let dialogRef = this.dialog.open(GameCompleteDialogComponent, {
            width: '300px',
            data: conclusion === 'win' ? { text: this.winner } : { text: 'draw'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'playAgain') {
                this.resetGame();
            }
        });
    }

    /**
     * This method handles if there was a draw (neither player won). It simply loops
     * through the tiles aray and adds the `.loser` class to each tile.
     */
    draw():void {
        this.tiles.forEach((tile, index) => {
            $('.tile_'+(index+1)).addClass('loser');
        });
        this.gameComplete = true;
        this.openGameCompleteDialog('draw');
    }

    ngOnDestroy():void {
        this.eventHandler.unsubscribe();
        if (this.apiListener) {
            this.apiListener.unsubscribe();
        }

    }
}
