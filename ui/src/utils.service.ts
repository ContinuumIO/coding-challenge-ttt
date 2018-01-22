import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
    constructor() {}

    /**
     * This is a utility method to generate a UID for use for the game.
     *
     * @return Returns a uid composed of a series of random numbers converted to strings
     */
    generateUid():string {
        let uid = ""+this.randomNum()+""+this.randomNum()+""+this.randomNum()+""+this.randomNum()+""+this.randomNum()+""+this.randomNum()+""+this.randomNum()+""+this.randomNum();
        return uid;
    }

    /**
     * This is utility method to generate a string of random numbers
     *
     * @return Returns a string of random numbers
     */
    randomNum():string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}
