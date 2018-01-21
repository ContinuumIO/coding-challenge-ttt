import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
};
@Injectable()
export class GamesApiService {

  private apiUrl = "http://localhost:8080/api"

  constructor(private http: HttpClient) { }

  saveGame(players, gameboard) : Observable<object> {
      return this.http.post(this.apiUrl+"/games/",
                JSON.stringify({players : players, board : gameboard}),
                 httpOptions);
  }

  listGames() : Observable<object> {
      return this.http.get(this.apiUrl+"/games/");
  }

  findGame(gameId) : Observable<object> {
      return this.http.get(this.apiUrl+"/games/"+gameId);
  }

}
