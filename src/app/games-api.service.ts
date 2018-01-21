import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const body = JSON.stringify({ content: ''});
const headers = new Headers({ 'Content-Type': 'text/plain' }); // ... Set content type to JSON
const options = new RequestOptions({ headers: headers }); // Create a request option

@Injectable()
export class GamesApiService {

  private apiUrl = "http://localhost:8080/api"

  constructor(private http: Http) { }

  createGame() : Observable<object> {
      return this.http.post(this.apiUrl+"/games/", {})
                .map((res:Response) => res.json());
  }

  listGames() : Observable<object> {
      return this.http.get(this.apiUrl+"/games/")
                .map((res:Response) => res.json());
  }

  findGame(gameId) : Observable<object> {
      return this.http.get(this.apiUrl+"/games/"+gameId)
                .map((res:Response) => res.json());
  }

}
