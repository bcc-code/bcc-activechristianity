/**
 * A tiny event emitter with mixin function for objects
 */
export default class Emitter {
    static mixin(target: Object | Function): Object | Function;
    _events: {
        [k: string]: Array<Function>;
    };
    on(event: string, cb: Function): void;
    off(event: string, cb: Function): void;
    emit(event: string, args: any): void;
}
