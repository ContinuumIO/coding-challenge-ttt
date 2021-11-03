import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
};

export const Game = {
  getGames: (): Promise<any> => requests.get("games"),
  createGame: (game: any): Promise<any> => requests.post("games", game),
};
