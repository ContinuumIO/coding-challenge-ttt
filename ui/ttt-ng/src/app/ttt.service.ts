import { GameListData } from './data-models/game-list.data';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AttributesData } from './data-models/attributes.data';
import { GameData } from './data-models/game.data';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};

@Injectable()
export class TTTService {
  private serverUrl = 'http://localhost:8080/api/games';
  private activeGame: GameData;

  constructor(private http: HttpClient) {}

  getExistingGame(gameId: string) {
    const getGameUrl = this.serverUrl + '/' + gameId;
    return this.http
      .get<GameData>(getGameUrl)
      .pipe(catchError(this.handleError));
  }
  getListOfGames(): Observable<GameListData> {
    return this.http
      .get<GameListData>(this.serverUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates database using the gameID
   * and sends only the game attributes
   */
  updateGame(game: GameData) {
    console.log('game id - ' + game.id);
    const updateGameUrl = this.serverUrl + '/' + game.id;
    return this.http
      .post<GameData>(updateGameUrl, game.attributes)
      .pipe(catchError(this.handleError));
  }

  /**
   * Requires the attributes data in order to make the post call
   */
  createNewGame(pOneName: string, pTwoName: string): Observable<GameData> {
    const initGame: AttributesData = new AttributesData();
    initGame.initialize(pOneName, pTwoName);
    // const createGameUrl = this.serverUrl + 'api/games';
    const createGameUrl = 'http://localhost:8080/api/games';
    return this.http
      .post<GameData>(createGameUrl, initGame, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getActiveGame(): GameData {
    return this.activeGame;
  }

  setActiveGame(game: GameData) {
    this.activeGame = game;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error has occurred - ' + error.error);

    return throwError('Error has occurred in TTTService');
  }
}
