import os
import subprocess
import logging

from tornado.options import define, options, parse_command_line

from backend import server


def build_ui():
    """Build the front-end assets using the `npm` toolchain"""
    previous_dir = os.getcwd()
    os.chdir(os.path.join(os.path.dirname(__file__), "ui"))
    logging.info("Building UI assets")
    subprocess.call(["npm", "run", "build"])
    os.chdir(previous_dir)


define("port", default=8080, help="run on the given port", type=int)
define("debug", default=False, help="turn on debugging", type=bool)
define("skip-build", default=False, help="skip rebuilding UI", type=bool)


if __name__ == '__main__':
    parse_command_line()
    if not options.skip_build:
        build_ui()

    server.run(**options.as_dict())
