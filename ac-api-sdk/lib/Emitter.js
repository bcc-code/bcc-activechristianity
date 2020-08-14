/**
 * A tiny event emitter with mixin function for objects
 */
export default class Emitter {
    constructor() {
        this._events = {};
    }
    static mixin(target) {
        const proto = typeof target === 'function' ? target.prototype : target;
        proto.on = Emitter.prototype.on;
        proto.off = Emitter.prototype.off;
        proto.emit = Emitter.prototype.emit;
        return target;
    }
    on(event, cb) {
        this._events[event] = this._events[event] || [];
        this._events[event].push(cb);
    }
    off(event, cb) {
        if (event in this._events === false)
            return;
        this._events[event].splice(this._events[event].indexOf(cb), 1);
    }
    emit(event, args) {
        if (event in this._events === false)
            return;
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}
