import { NgModule } from "@angular/core";

import { MembersDetailRoutingModule } from "./members-detail-routing.module";
import { FormsModule } from "@angular/forms";
import { MembersDetailComponent } from "./members-detail.component";
import { MembersDetailService } from "./members-detail.service";
import { CommonModule } from "@angular/common";
import {
  NzButtonModule,
  NzPageHeaderModule,
  NzTableModule,
  NzInputModule,
  NzIconModule,
  NgZorroAntdModule,
  NzGridModule,
  NzCardModule,
  NzDividerModule
} from "ng-zorro-antd";

@NgModule({
  imports: [
    MembersDetailRoutingModule,
    CommonModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzInputModule,
    NzTableModule,
    NzIconModule,
    NgZorroAntdModule,
    NzGridModule,
    NzCardModule,
    FormsModule,
    NzDividerModule
  ],
  declarations: [MembersDetailComponent],
  exports: [MembersDetailComponent],
  providers: [MembersDetailService]
})
export class MembersDetailModule {}
