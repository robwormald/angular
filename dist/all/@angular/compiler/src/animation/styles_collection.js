/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var StylesCollectionEntry = (function () {
    function StylesCollectionEntry(time, value) {
        this.time = time;
        this.value = value;
    }
    StylesCollectionEntry.prototype.matches = function (time, value) {
        return time == this.time && value == this.value;
    };
    return StylesCollectionEntry;
}());
exports.StylesCollectionEntry = StylesCollectionEntry;
var StylesCollection = (function () {
    function StylesCollection() {
        this.styles = {};
    }
    StylesCollection.prototype.insertAtTime = function (property, time, value) {
        var tuple = new StylesCollectionEntry(time, value);
        var entries = this.styles[property];
        if (!lang_1.isPresent(entries)) {
            entries = this.styles[property] = [];
        }
        // insert this at the right stop in the array
        // this way we can keep it sorted
        var insertionIndex = 0;
        for (var i = entries.length - 1; i >= 0; i--) {
            if (entries[i].time <= time) {
                insertionIndex = i + 1;
                break;
            }
        }
        collection_1.ListWrapper.insert(entries, insertionIndex, tuple);
    };
    StylesCollection.prototype.getByIndex = function (property, index) {
        var items = this.styles[property];
        if (lang_1.isPresent(items)) {
            return index >= items.length ? null : items[index];
        }
        return null;
    };
    StylesCollection.prototype.indexOfAtOrBeforeTime = function (property, time) {
        var entries = this.styles[property];
        if (lang_1.isPresent(entries)) {
            for (var i = entries.length - 1; i >= 0; i--) {
                if (entries[i].time <= time)
                    return i;
            }
        }
        return null;
    };
    return StylesCollection;
}());
exports.StylesCollection = StylesCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzX2NvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9hbmltYXRpb24vc3R5bGVzX2NvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDJCQUEwQixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2pELHFCQUF3QixnQkFBZ0IsQ0FBQyxDQUFBO0FBRXpDO0lBQ0UsK0JBQW1CLElBQVksRUFBUyxLQUFvQjtRQUF6QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBZTtJQUFHLENBQUM7SUFFaEUsdUNBQU8sR0FBUCxVQUFRLElBQVksRUFBRSxLQUFvQjtRQUN4QyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSw2QkFBcUIsd0JBTWpDLENBQUE7QUFFRDtJQUFBO1FBQ0UsV0FBTSxHQUE2QyxFQUFFLENBQUM7SUF1Q3hELENBQUM7SUFyQ0MsdUNBQVksR0FBWixVQUFhLFFBQWdCLEVBQUUsSUFBWSxFQUFFLEtBQW9CO1FBQy9ELElBQUksS0FBSyxHQUFHLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELDZDQUE2QztRQUM3QyxpQ0FBaUM7UUFDakMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLGNBQWMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixLQUFLLENBQUM7WUFDUixDQUFDO1FBQ0gsQ0FBQztRQUVELHdCQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELHFDQUFVLEdBQVYsVUFBVyxRQUFnQixFQUFFLEtBQWE7UUFDeEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxnREFBcUIsR0FBckIsVUFBc0IsUUFBZ0IsRUFBRSxJQUFZO1FBQ2xELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUM3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztvQkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1ksd0JBQWdCLG1CQXdDNUIsQ0FBQSJ9