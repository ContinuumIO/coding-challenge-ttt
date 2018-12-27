import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { HttpHost } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(@Inject(HttpHost) private httpHost: string, private http: HttpClient) {
  }

  createGame(gameData) {
    return this.http.post(`${this.httpHost}/api/games`, {});
  }

  loadGame(id) {
    return this.http.get(`${this.httpHost}/api/games/${id}`);
  }

  saveGame(id, gameData) {
    return this.http.post(`${this.httpHost}/api/games/${id}`, {...gameData});
  }

}

