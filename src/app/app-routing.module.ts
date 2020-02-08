import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/welcome" },
  {
    path: "welcome",
    loadChildren: () =>
      import("./pages/welcome/welcome.module").then(m => m.WelcomeModule)
  },
  {
    path: "members",
    loadChildren: () =>
      import("./pages/members/members.module").then(m => m.MembersModule)
  },
  {
    path: "members-detail",
    loadChildren: () =>
      import("./pages/members-detail/members-detail.module").then(
        m => m.MembersDetailModule
      )
  },
  {
    path: "members-detail/:hn",
    loadChildren: () =>
      import("./pages/members-detail/form/members-detail-form.module").then(
        m => m.MembersDetailFormModule
      )
  },
  {
    path: "medicines",
    loadChildren: () =>
      import("./pages/medicines/medicines.module").then(m => m.MedicinesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
