import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MembersDetailComponent } from "./members-detail.component";

const routes: Routes = [{ path: "", component: MembersDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersDetailRoutingModule {}
