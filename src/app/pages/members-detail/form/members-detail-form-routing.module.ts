import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MembersDetailFormComponent } from "./members-detail-form.component";

const routes: Routes = [{ path: "", component: MembersDetailFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersDetailRoutingModule {}
