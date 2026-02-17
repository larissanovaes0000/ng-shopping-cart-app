import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "./views/home/home.component";
import { NotFoundComponent } from "./views/not-found/not-found.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
