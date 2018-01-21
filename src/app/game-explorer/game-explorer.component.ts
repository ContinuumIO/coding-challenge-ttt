import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';
import { GamesApiService } from '../games-api.service';

@Component({
  selector: 'game-explorer',
  templateUrl: './game-explorer.component.html',
  styleUrls: ['./game-explorer.component.scss']
})
export class GameExplorerComponent {

  private games : [any];

  constructor(private gamesApi : GamesApiService) {
      // Retrieving the list of saved games
      this.gamesApi.listGames()
      .subscribe(response => {
          this.games = response.data;
      })
  }

}
