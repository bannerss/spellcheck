import { InjectionToken } from '@angular/core';
export const APP_CONFIG = {
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
};
export const CONFIG_TOKEN = new InjectionToken('CONFIG_TOKEN', {
    providedIn: 'root',
    factory: () => APP_CONFIG
});
//# sourceMappingURL=config.js.map