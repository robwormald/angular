/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var collection_1 = require('@angular/core/src/facade/collection');
/**
 * You can find the Angular 1 implementation of this example here:
 * https://github.com/wardbell/ng1DataBinding
 */
// ---- model
var OrderItem = (function () {
    function OrderItem(orderItemId, orderId, productName, qty, unitPrice) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.productName = productName;
        this.qty = qty;
        this.unitPrice = unitPrice;
    }
    Object.defineProperty(OrderItem.prototype, "total", {
        get: function () { return this.qty * this.unitPrice; },
        enumerable: true,
        configurable: true
    });
    return OrderItem;
}());
var Order = (function () {
    function Order(orderId, customerName, limit, _dataService) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.limit = limit;
        this._dataService = _dataService;
    }
    Object.defineProperty(Order.prototype, "items", {
        get: function () { return this._dataService.itemsFor(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "total", {
        get: function () { return this.items.map(function (i) { return i.total; }).reduce(function (a, b) { return a + b; }, 0); },
        enumerable: true,
        configurable: true
    });
    return Order;
}());
// ---- services
var _nextId = 1000;
var DataService = (function () {
    function DataService() {
        this.currentOrder = null;
        this.orders = [
            new Order(_nextId++, "J. Coltrane", 100, this),
            new Order(_nextId++, "B. Evans", 200, this)
        ];
        this.orderItems = [
            new OrderItem(_nextId++, this.orders[0].orderId, "Bread", 5, 1),
            new OrderItem(_nextId++, this.orders[0].orderId, "Brie", 5, 2),
            new OrderItem(_nextId++, this.orders[0].orderId, "IPA", 5, 3),
            new OrderItem(_nextId++, this.orders[1].orderId, "Mozzarella", 5, 2),
            new OrderItem(_nextId++, this.orders[1].orderId, "Wine", 5, 3)
        ];
    }
    DataService.prototype.itemsFor = function (order) {
        return this.orderItems.filter(function (i) { return i.orderId === order.orderId; });
    };
    DataService.prototype.addItemForOrder = function (order) {
        this.orderItems.push(new OrderItem(_nextId++, order.orderId, "", 0, 0));
    };
    DataService.prototype.deleteItem = function (item) { collection_1.ListWrapper.remove(this.orderItems, item); };
    /** @nocollapse */
    DataService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DataService.ctorParameters = [];
    return DataService;
}());
var OrderListComponent = (function () {
    function OrderListComponent(_service) {
        this._service = _service;
        this.orders = _service.orders;
    }
    OrderListComponent.prototype.select = function (order) { this._service.currentOrder = order; };
    /** @nocollapse */
    OrderListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'order-list-cmp',
                    template: "\n    <h1>Orders</h1>\n  \t<div *ngFor=\"let order of orders\" [class.warning]=\"order.total > order.limit\">\n      <div>\n        <label>Customer name:</label>\n        {{order.customerName}}\n      </div>\n\n      <div>\n        <label>Limit: <input [(ngModel)]=\"order.limit\" type=\"number\" placeholder=\"Limit\"></label>\n      </div>\n\n      <div>\n        <label>Number of items:</label>\n        {{order.items.length}}\n      </div>\n\n      <div>\n        <label>Order total:</label>\n        {{order.total}}\n      </div>\n\n      <button (click)=\"select(order)\">Select</button>\n  \t</div>\n  ",
                    directives: [common_1.FORM_DIRECTIVES, common_1.NgFor]
                },] },
    ];
    /** @nocollapse */
    OrderListComponent.ctorParameters = [
        { type: DataService, },
    ];
    return OrderListComponent;
}());
var OrderItemComponent = (function () {
    function OrderItemComponent() {
        this.delete = new core_1.EventEmitter();
    }
    OrderItemComponent.prototype.onDelete = function () { this.delete.emit(this.item); };
    /** @nocollapse */
    OrderItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'order-item-cmp',
                    template: "\n    <div>\n      <div>\n        <label>Product name: <input [(ngModel)]=\"item.productName\" type=\"text\" placeholder=\"Product name\"></label>\n      </div>\n\n      <div>\n        <label>Quantity: <input [(ngModel)]=\"item.qty\" type=\"number\" placeholder=\"Quantity\"></label>\n      </div>\n\n      <div>\n        <label>Unit Price: <input [(ngModel)]=\"item.unitPrice\" type=\"number\" placeholder=\"Unit price\"></label>\n      </div>\n\n      <div>\n        <label>Total:</label>\n        {{item.total}}\n      </div>\n\n      <button (click)=\"onDelete()\">Delete</button>\n    </div>\n  ",
                    directives: [common_1.FORM_DIRECTIVES]
                },] },
    ];
    /** @nocollapse */
    OrderItemComponent.propDecorators = {
        'item': [{ type: core_1.Input },],
        'delete': [{ type: core_1.Output },],
    };
    return OrderItemComponent;
}());
var OrderDetailsComponent = (function () {
    function OrderDetailsComponent(_service) {
        this._service = _service;
    }
    Object.defineProperty(OrderDetailsComponent.prototype, "order", {
        get: function () { return this._service.currentOrder; },
        enumerable: true,
        configurable: true
    });
    OrderDetailsComponent.prototype.deleteItem = function (item) { this._service.deleteItem(item); };
    OrderDetailsComponent.prototype.addItem = function () { this._service.addItemForOrder(this.order); };
    /** @nocollapse */
    OrderDetailsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'order-details-cmp',
                    template: "\n    <div *ngIf=\"order !== null\">\n      <h1>Selected Order</h1>\n      <div>\n        <label>Customer name: <input [(ngModel)]=\"order.customerName\" type=\"text\" placeholder=\"Customer name\"></label>\n      </div>\n\n      <div>\n        <label>Limit: <input [(ngModel)]=\"order.limit\" type=\"number\" placeholder=\"Limit\"></label>\n      </div>\n\n      <div>\n        <label>Number of items:</label>\n        {{order.items.length}}\n      </div>\n\n      <div>\n        <label>Order total:</label>\n        {{order.total}}\n      </div>\n\n      <h2>Items</h2>\n      <button (click)=\"addItem()\">Add Item</button>\n      <order-item-cmp *ngFor=\"let item of order.items\" [item]=\"item\" (delete)=\"deleteItem(item)\"></order-item-cmp>\n    </div>\n  ",
                    directives: [common_1.FORM_DIRECTIVES, OrderItemComponent, common_1.NgFor, common_1.NgIf]
                },] },
    ];
    /** @nocollapse */
    OrderDetailsComponent.ctorParameters = [
        { type: DataService, },
    ];
    return OrderDetailsComponent;
}());
var OrderManagementApplication = (function () {
    function OrderManagementApplication() {
    }
    /** @nocollapse */
    OrderManagementApplication.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'order-management-app',
                    providers: [DataService],
                    template: "\n    <order-list-cmp></order-list-cmp>\n    <order-details-cmp></order-details-cmp>\n  ",
                    directives: [OrderListComponent, OrderDetailsComponent]
                },] },
    ];
    return OrderManagementApplication;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(OrderManagementApplication);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL29yZGVyX21hbmFnZW1lbnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELHFCQU1PLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHVCQUEyQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRTdELDJCQUEwQixxQ0FBcUMsQ0FBQyxDQUFBO0FBRWhFOzs7R0FHRztBQUVILGFBQWE7QUFFYjtJQUNFLG1CQUFtQixXQUFtQixFQUFTLE9BQWUsRUFBUyxXQUFtQixFQUN2RSxHQUFXLEVBQVMsU0FBaUI7UUFEckMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDdkUsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7SUFBRyxDQUFDO0lBRTVELHNCQUFJLDRCQUFLO2FBQVQsY0FBc0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzNELGdCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFFRDtJQUNFLGVBQW1CLE9BQWUsRUFBUyxZQUFvQixFQUFTLEtBQWEsRUFDakUsWUFBeUI7UUFEMUIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNqRSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtJQUFHLENBQUM7SUFFakQsc0JBQUksd0JBQUs7YUFBVCxjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7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