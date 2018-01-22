import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventService {

    /**
     * A Subject emitter for event dispatching
     */
    private subject:Subject<any> = new Subject<any>();

    constructor() {};

    /**
     * This method will dispatch the event requested to all subscribed listeners
     *
     * @param event The event object to dispatch
     */
    dispatch(event:any):void {
        this.subject.next(event);
    }

    /**
     * This method handles the dispatched events and returns an Observable for the
     * listener to use
     * @return Returns an Observable for consumption by the subscribing entity
     */
    handle():Observable<any> {
        return this.subject.asObservable();
    }
}
