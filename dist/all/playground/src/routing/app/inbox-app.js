/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var db = require('./data');
var async_1 = require('@angular/core/src/facade/async');
var lang_1 = require('@angular/core/src/facade/lang');
var InboxRecord = (function () {
    function InboxRecord(data) {
        if (data === void 0) { data = null; }
        this.id = '';
        this.subject = '';
        this.content = '';
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.draft = false;
        if (lang_1.isPresent(data)) {
            this.setData(data);
        }
    }
    InboxRecord.prototype.setData = function (record) {
        this.id = record['id'];
        this.subject = record['subject'];
        this.content = record['content'];
        this.email = record['email'];
        this.firstName = record['first-name'];
        this.lastName = record['last-name'];
        this.date = record['date'];
        this.draft = record['draft'] == true;
    };
    return InboxRecord;
}());
exports.InboxRecord = InboxRecord;
var DbService = (function () {
    function DbService() {
    }
    DbService.prototype.getData = function () {
        var p = new async_1.PromiseCompleter();
        p.resolve(db.data);
        return p.promise;
    };
    DbService.prototype.drafts = function () {
        return this.getData().then(function (data) {
            return data.filter(function (record) { return lang_1.isPresent(record['draft']) && record['draft'] == true; });
        });
    };
    DbService.prototype.emails = function () {
        return this.getData().then(function (data) {
            return data.filter(function (record) { return !lang_1.isPresent(record['draft']); });
        });
    };
    DbService.prototype.email = function (id /** TODO #9100 */) {
        return async_1.PromiseWrapper.then(this.getData(), function (data) {
            for (var i = 0; i < data.length; i++) {
                var entry = data[i];
                if (entry['id'] == id) {
                    return entry;
                }
            }
            return null;
        });
    };
    /** @nocollapse */
    DbService.decorators = [
        { type: core_1.Injectable },
    ];
    return DbService;
}());
exports.DbService = DbService;
var InboxCmp = (function () {
    function InboxCmp(router, db, route) {
        var _this = this;
        this.router = router;
        this.items = [];
        this.ready = false;
        route.params.forEach(function (p) {
            var sortType = p['sort'];
            var sortEmailsByDate = lang_1.isPresent(sortType) && sortType == "date";
            async_1.PromiseWrapper.then(db.emails(), function (emails) {
                _this.ready = true;
                _this.items = emails.map(function (data) { return new InboxRecord(data); });
                if (sortEmailsByDate) {
                    _this.items.sort(function (a, b) {
                        return lang_1.DateWrapper.toMillis(lang_1.DateWrapper.fromISOString(a.date)) <
                            lang_1.DateWrapper.toMillis(lang_1.DateWrapper.fromISOString(b.date)) ?
                            -1 :
                            1;
                    });
                }
            });
        });
    }
    /** @nocollapse */
    InboxCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'inbox', templateUrl: 'app/inbox.html', directives: router_1.ROUTER_DIRECTIVES },] },
    ];
    /** @nocollapse */
    InboxCmp.ctorParameters = [
        { type: router_1.Router, },
        { type: DbService, },
        { type: router_1.ActivatedRoute, },
    ];
    return InboxCmp;
}());
exports.InboxCmp = InboxCmp;
var DraftsCmp = (function () {
    function DraftsCmp(router, db) {
        var _this = this;
        this.router = router;
        this.items = [];
        this.ready = false;
        async_1.PromiseWrapper.then(db.drafts(), function (drafts) {
            _this.ready = true;
            _this.items = drafts.map(function (data) { return new InboxRecord(data); });
        });
    }
    /** @nocollapse */
    DraftsCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'drafts', templateUrl: 'app/drafts.html', directives: router_1.ROUTER_DIRECTIVES },] },
    ];
    /** @nocollapse */
    DraftsCmp.ctorParameters = [
        { type: router_1.Router, },
        { type: DbService, },
    ];
    return DraftsCmp;
}());
exports.DraftsCmp = DraftsCmp;
exports.ROUTER_CONFIG = [
    { path: '', terminal: true, redirectTo: 'inbox' },
    { path: 'inbox', component: InboxCmp },
    { path: 'drafts', component: DraftsCmp },
    { path: 'detail', loadChildren: 'app/inbox-detail.js' }
];
var InboxApp = (function () {
    function InboxApp() {
    }
    InboxApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'inbox-app',
                    viewProviders: [DbService],
                    templateUrl: 'app/inbox-app.html',
                    directives: router_1.ROUTER_DIRECTIVES
                },] },
    ];
    return InboxApp;
}());
exports.InboxApp = InboxApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5ib3gtYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy9yb3V0aW5nL2FwcC9pbmJveC1hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFvQyxlQUFlLENBQUMsQ0FBQTtBQUNwRCx1QkFBd0QsaUJBQWlCLENBQUMsQ0FBQTtBQUMxRSxJQUFZLEVBQUUsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU3QixzQkFBK0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNoRixxQkFBcUMsK0JBQStCLENBQUMsQ0FBQTtBQUVyRTtJQVVFLHFCQUFZLElBUUo7UUFSSSxvQkFRSixHQVJJLFdBUUo7UUFqQlIsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQVdyQixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLE1BUVA7UUFDQyxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFJLE1BQWdDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFFBQVEsR0FBSSxNQUFnQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDO0FBMUNZLG1CQUFXLGNBMEN2QixDQUFBO0FBQ0Q7SUFBQTtJQWlDQSxDQUFDO0lBaENDLDJCQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsR0FBRyxJQUFJLHdCQUFnQixFQUFTLENBQUM7UUFDdEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FDdEIsVUFBQyxJQUFXO1lBQ1IsT0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFyRCxDQUFxRCxDQUFDO1FBQTVFLENBQTRFLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBVztZQUNSLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztRQUFsRCxDQUFrRCxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELHlCQUFLLEdBQUwsVUFBTSxFQUFPLENBQUMsaUJBQWlCO1FBQzdCLE1BQU0sQ0FBQyxzQkFBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBQyxJQUFXO1lBQ3JELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSxpQkFBUyxZQWlDckIsQ0FBQTtBQUNEO0lBSUUsa0JBQW1CLE1BQWMsRUFBRSxFQUFhLEVBQUUsS0FBcUI7UUFKekUsaUJBaUNDO1FBN0JvQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSHpCLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBQzFCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFHN0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ3BCLElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixJQUFNLGdCQUFnQixHQUFHLGdCQUFTLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQztZQUVuRSxzQkFBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBQyxNQUFhO2dCQUM3QyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztnQkFFdkQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUNyQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQWMsRUFBRSxDQUFjO3dCQUM3QyxPQUFBLGtCQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkQsa0JBQVcsQ0FBQyxRQUFRLENBQUMsa0JBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNyRCxDQUFDLENBQUM7NEJBQ0YsQ0FBQztvQkFISCxDQUdHLENBQUMsQ0FBQztnQkFDVCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxrQkFBa0I7SUFDWCxtQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLDBCQUFpQixFQUFDLEVBQUcsRUFBRTtLQUMvRyxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsZUFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLFNBQVMsR0FBRztRQUNuQixFQUFDLElBQUksRUFBRSx1QkFBYyxHQUFHO0tBQ3ZCLENBQUM7SUFDRixlQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSxnQkFBUSxXQWlDcEIsQ0FBQTtBQUNEO0lBSUUsbUJBQW9CLE1BQWMsRUFBRSxFQUFhO1FBSm5ELGlCQW1CQztRQWZxQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSDFCLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBQzFCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFHN0Isc0JBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQUMsTUFBYTtZQUM3QyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixLQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsMEJBQWlCLEVBQUMsRUFBRyxFQUFFO0tBQ2pILENBQUM7SUFDRixrQkFBa0I7SUFDWCx3QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxlQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsU0FBUyxHQUFHO0tBQ2xCLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksaUJBQVMsWUFtQnJCLENBQUE7QUFFWSxxQkFBYSxHQUFHO0lBQzNCLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUM7SUFDL0MsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUM7SUFDcEMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUM7SUFDdEMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRTtDQUN2RCxDQUFDO0FBQ0Y7SUFBQTtJQVNBLENBQUM7SUFSTSxtQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsV0FBVztvQkFDckIsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUMxQixXQUFXLEVBQUUsb0JBQW9CO29CQUNqQyxVQUFVLEVBQUUsMEJBQWlCO2lCQUM5QixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksZ0JBQVEsV0FTcEIsQ0FBQSJ9