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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
