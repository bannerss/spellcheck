var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
let HighlightelementDirective = class HighlightelementDirective {
    constructor(coursesService) {
        this.coursesService = coursesService;
        this.isHighlighted = false;
        this.toggleHighlight = new EventEmitter();
        console.log('coursesService highlighted ' + coursesService.id);
    }
    get cssClasses() {
        return this.isHighlighted;
    }
    mouseOver($event) {
        console.log($event);
        this.isHighlighted = true;
        this.toggleHighlight.emit(this.isHighlighted);
    }
    mouseLeave() {
        this.isHighlighted = false;
        this.toggleHighlight.emit(this.isHighlighted);
    }
    toggle() {
        this.isHighlighted = !this.isHighlighted;
        this.toggleHighlight.emit(this.isHighlighted);
    }
};
__decorate([
    Input('highlighted')
], HighlightelementDirective.prototype, "isHighlighted", void 0);
__decorate([
    Output()
], HighlightelementDirective.prototype, "toggleHighlight", void 0);
__decorate([
    HostBinding('class.highlighted')
], HighlightelementDirective.prototype, "cssClasses", null);
__decorate([
    HostListener('mouseover', ['$event'])
], HighlightelementDirective.prototype, "mouseOver", null);
__decorate([
    HostListener('mouseleave')
], HighlightelementDirective.prototype, "mouseLeave", null);
HighlightelementDirective = __decorate([
    Directive({
        selector: '[Highlightelement]',
        exportAs: 'hl'
    })
], HighlightelementDirective);
export { HighlightelementDirective };
//# sourceMappingURL=highlightelement.directive.js.map