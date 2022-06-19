"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_TOKEN = exports.APP_CONFIG = void 0;
const core_1 = require("@angular/core");
exports.APP_CONFIG = {
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
};
exports.CONFIG_TOKEN = new core_1.InjectionToken('CONFIG_TOKEN', {
    providedIn: 'root',
    factory: () => exports.APP_CONFIG
});
//# sourceMappingURL=config.js.map