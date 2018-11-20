import { GameData } from './../data-models/game.data';
import { TTTService } from './../ttt.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { GameListData } from '../data-models/game-list.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  dataSource;
  displayedCols: string[] = ['gameId', 'playerOneName', 'playerTwoName'];
  gamesList: GameData[] = [];
  constructor(private tttService: TTTService, private router: Router) {}

  ngOnInit() {
    this.tttService.getListOfGames().subscribe((data: GameListData) => {
      this.gamesList = data.data;
      this.dataSource = this.gamesList;
      console.log(this.dataSource.data);
    });
  }

  onGameSelect(row: any) {
    console.log('row selected - ' + JSON.stringify(row));
    // this.tttService.getExistingGame(row.id).subscribe((data: GameData) => {
    this.tttService.setActiveGame(row);
    this.router.navigate(['/ttt-game']);
    // });
  }
}
