import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appPlaceholder]'
})
export class PLaceholderDirective{
    constructor(public viewContainerRef: ViewContainerRef){}

}
