import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';

const headers = new HttpHeaders({'Content-Type': 'application/json'});
const options = { headers: headers };

@Injectable()
export class ApiService {
    constructor(private http:HttpClient) {}

    /**
     * This method queries for the list of saved games.
     *
     * @return Returns a JSON object of the list of saved games
     */
    getGames():Observable<object> {
        return this.http.get('/api/games', options);
    }

    /**
     * This method queries for the saved game by ID
     * @param  id The string id of the game to query for
     * @return    Returns a JSON object of the requested saved game
     */
    getGame(id:string):Observable<object> {
        return this.http.get('/api/games/'+id, options);
    }

    /**
     * This method saves and updates the game. If no ID exists for the game, it saves
     * the games. If an ID exists for the game it updates the game.
     * @param  data [description]
     * @return      [description]
     */
    saveGame(data):Observable<object> {
        return this.http.post('/api/games', JSON.stringify(data), options);
    }
}
