import os
import logging
import json

import tornado
from tornado.web import RequestHandler, Application

from .game import Game, _REGISTRY

class IndexHandler(RequestHandler):
    def get(self):
        self.render("index.html")

class BaseHandler(RequestHandler):
    def set_default_headers(self):
        print("setting headers!!!")
        self.set_header("Content-Type", "application/json")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "content-type")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PATCH, PUT')

    def options(self, arg = 'No args'):
        # no body
        print(arg)
        self.set_status(204)
        self.finish()

class GameListHandler(BaseHandler):
    def get(self):
        """List all known games"""
        self.write({"data": [g.to_json() for g in _REGISTRY.list()]})

    def post(self):
        """Create a new game"""
        game_data = json.loads(self.request.body.decode('utf-8'))
        game_instance = Game(**game_data)
        _REGISTRY.add(game_instance)
        self.set_status(201)
        self.set_header("Location", "/api/games/{}".format(game_instance._id))
        self.write(game_instance.to_json())


class GameByIDHandler(BaseHandler):
    def get(self, game_id):
        """Return a game based on its ID"""
        game = _REGISTRY.get(game_id)
        if not game:
            self.set_status(404)
        else:
            self.write({"data": game.to_json()})

    def post(self, game_id):
        """Overwrite a game based on its ID"""
        game = _REGISTRY.get(game_id)
        if not game:
            self.set_status(404)
        else:
            game_data = json.loads(self.request.body.decode('utf-8'))
            game_instance = Game(_id=game_id, **game_data)
            _REGISTRY.add(game_instance)
            self.write(game_instance.to_json())


CURRENT_DIR = os.path.dirname(__file__)


def run(port=8080, debug=False, **kwargs):
    handlers = [
        (r"/", IndexHandler),
        (r"/api/games/?", GameListHandler),
        (r"/api/games/([^/]+)/?", GameByIDHandler),
    ]
    app = Application(
        handlers,
        cookie_secret=os.urandom(16),
        template_path=os.path.join(CURRENT_DIR, '..', 'app', 'static'),
        static_path=os.path.join(CURRENT_DIR, '..', 'app', 'static'),
        xsrf_cookies=False,
        debug=debug)

    logging.info("Server running on port %d", port)
    app.listen(port)
    tornado.ioloop.IOLoop.current().start()
