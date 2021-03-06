"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const composer_1 = require("./composer");
class Router {
    constructor(routeFn, handlers = new Map()) {
        this.routeFn = routeFn;
        this.handlers = handlers;
        this.otherwiseHandler = composer_1.default.passThru();
        if (typeof routeFn !== 'function') {
            throw new Error('Missing routing function');
        }
    }
    on(route, ...fns) {
        if (fns.length === 0) {
            throw new TypeError('At least one handler must be provided');
        }
        this.handlers.set(route, composer_1.default.compose(fns));
        return this;
    }
    otherwise(...fns) {
        if (fns.length === 0) {
            throw new TypeError('At least one otherwise handler must be provided');
        }
        this.otherwiseHandler = composer_1.default.compose(fns);
        return this;
    }
    middleware() {
        return composer_1.default.lazy((ctx) => {
            var _a;
            const result = this.routeFn(ctx);
            if (result == null) {
                return this.otherwiseHandler;
            }
            Object.assign(ctx, result.context);
            Object.assign(ctx.state, result.state);
            return (_a = this.handlers.get(result.route)) !== null && _a !== void 0 ? _a : this.otherwiseHandler;
        });
    }
}
exports.Router = Router;
