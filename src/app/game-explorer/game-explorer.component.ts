import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';
import { GamesApiService } from '../games-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'game-explorer',
  templateUrl: './game-explorer.component.html',
  styleUrls: ['./game-explorer.component.scss']
})
export class GameExplorerComponent {

  private games : [any];

  constructor(private gamesApi : GamesApiService, private router: Router) {
      // Retrieving the list of saved games
      this.gamesApi.listGames()
      .subscribe(response => {
          this.games = response.data;
      });
  }

  goToPlayerSelect() : void {
      this.router.navigate(['/']);
  }

}
