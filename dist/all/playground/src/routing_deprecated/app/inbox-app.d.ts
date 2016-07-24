import { Router } from '@angular/router-deprecated';
import { Location } from '@angular/common';
export declare class InboxApp {
    router: Router;
    location: Location;
    constructor(router: Router, location: Location);
    inboxPageActive(): boolean;
    draftsPageActive(): boolean;
}
