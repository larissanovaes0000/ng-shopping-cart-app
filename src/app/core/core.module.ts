import { NgModule } from "@angular/core";

import { ForProductDirective } from "./directives/for-product.directive";

@NgModule({
  imports: [ForProductDirective],
  exports: [ForProductDirective],
})
export class CoreModule {}