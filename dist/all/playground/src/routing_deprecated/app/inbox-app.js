/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var db = require('./data');
var common_1 = require('@angular/common');
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
var InboxDetailCmp = (function () {
    function InboxDetailCmp(db, params) {
        var _this = this;
        this.record = new InboxRecord();
        this.ready = false;
        var id = params.get('id');
        async_1.PromiseWrapper.then(db.email(id), function (data) { _this.record.setData(data); });
    }
    /** @nocollapse */
    InboxDetailCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'inbox-detail', directives: [router_deprecated_1.RouterLink], templateUrl: 'app/inbox-detail.html' },] },
    ];
    /** @nocollapse */
    InboxDetailCmp.ctorParameters = [
        { type: DbService, },
        { type: router_deprecated_1.RouteParams, },
    ];
    return InboxDetailCmp;
}());
var InboxCmp = (function () {
    function InboxCmp(router, db, params) {
        var _this = this;
        this.router = router;
        this.items = [];
        this.ready = false;
        var sortType = params.get('sort');
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
    }
    /** @nocollapse */
    InboxCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'inbox', templateUrl: 'app/inbox.html', directives: [router_deprecated_1.RouterLink] },] },
    ];
    /** @nocollapse */
    InboxCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: DbService, },
        { type: router_deprecated_1.RouteParams, },
    ];
    return InboxCmp;
}());
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
        { type: core_1.Component, args: [{ selector: 'drafts', templateUrl: 'app/drafts.html', directives: [router_deprecated_1.RouterLink] },] },
    ];
    /** @nocollapse */
    DraftsCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: DbService, },
    ];
    return DraftsCmp;
}());
var InboxApp = (function () {
    function InboxApp(router, location) {
        this.router = router;
        this.location = location;
    }
    InboxApp.prototype.inboxPageActive = function () { return this.location.path() == ''; };
    InboxApp.prototype.draftsPageActive = function () { return this.location.path() == '/drafts'; };
    /** @nocollapse */
    InboxApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'inbox-app',
                    viewProviders: [DbService],
                    templateUrl: 'app/inbox-app.html',
                    directives: [router_deprecated_1.RouterOutlet, router_deprecated_1.RouterLink]
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    new router_deprecated_1.Route({ path: '/', component: InboxCmp, name: 'Inbox' }),
                    new router_deprecated_1.Route({ path: '/drafts', component: DraftsCmp, name: 'Drafts' }),
                    new router_deprecated_1.Route({ path: '/detail/:id', component: InboxDetailCmp, name: 'DetailPage' })
                ],] },
    ];
    /** @nocollapse */
    InboxApp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.Location, },
    ];
    return InboxApp;
}());
exports.InboxApp = InboxApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5ib3gtYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy9yb3V0aW5nX2RlcHJlY2F0ZWQvYXBwL2luYm94LWFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQW9DLGVBQWUsQ0FBQyxDQUFBO0FBQ3BELGtDQU9PLDRCQUE0QixDQUFDLENBQUE7QUFDcEMsSUFBWSxFQUFFLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDN0IsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMsc0JBQStDLGdDQUFnQyxDQUFDLENBQUE7QUFDaEYscUJBQXFDLCtCQUErQixDQUFDLENBQUE7QUFFckU7SUFVRSxxQkFBWSxJQVFKO1FBUkksb0JBUUosR0FSSSxXQVFKO1FBakJSLE9BQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFXckIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxNQVFQO1FBQ0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFD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