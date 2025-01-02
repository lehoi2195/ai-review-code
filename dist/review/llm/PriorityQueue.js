"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PriorityQueue {
    constructor(items = []) {
        this.items = items;
    }
    enqueue(item, priority) {
        const queueItem = { priority, item };
        this.items.push(queueItem);
        this.items.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        var _a;
        return (_a = this.items.shift()) === null || _a === void 0 ? void 0 : _a.item;
    }
    size() {
        return this.items.length;
    }
    peek() {
        return this.items[0];
    }
    getItems() {
        return this.items.map((item) => item.item);
    }
}
exports.default = PriorityQueue;
