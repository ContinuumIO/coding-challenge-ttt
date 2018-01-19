import uuid


class GameRegistry:
    _games = None

    def __init__(self):
        self._games = {}

    def get(self, game_id):
        return self._games.get(game_id)

    def add(self, game):
        self._games[game._id] = game

    def remove(self, game_id):
        del self._games[game_id]

    def list(self):
        return self._games.values()


class Game:
    def __init__(self, players, board, _id=None, registry=None):
        self._id = _id or uuid.uuid4().hex
        self._registry = registry or _REGISTRY
        self.players = players
        self.board = board

    def to_json(self):
        return {
            "type": self.__class__.__name__,
            "id": self._id,
            "attributes": {
                "players": self.players,
                "board": self.board,
            }
        }


_REGISTRY = GameRegistry()
