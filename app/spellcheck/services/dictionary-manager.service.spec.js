"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const dictionary_manager_service_1 = require("./dictionary-manager.service");
describe('DictionaryManagerService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(dictionary_manager_service_1.DictionaryManagerService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=dictionary-manager.service.spec.js.map