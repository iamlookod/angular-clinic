import { NgModule } from "@angular/core";

import { MembersDetailRoutingModule } from "./members-detail-form-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MembersDetailFormComponent } from "./members-detail-form.component";
import { MembersDetailFormService } from "./members-detail-form.service";
import { CommonModule } from "@angular/common";
import {
  NzButtonModule,
  NzPageHeaderModule,
  NzTableModule,
  NzInputModule,
  NzDropDownModule,
  NzIconModule,
  NgZorroAntdModule,
  NzGridModule,
  NzCardModule,
  NzModalModule,
  NzMessageService,
  NzDescriptionsModule
} from "ng-zorro-antd";

@NgModule({
  imports: [
    MembersDetailRoutingModule,
    CommonModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzInputModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NgZorroAntdModule,
    NzGridModule,
    NzCardModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzDescriptionsModule
  ],
  declarations: [MembersDetailFormComponent],
  exports: [MembersDetailFormComponent],
  providers: [MembersDetailFormService, NzMessageService]
})
export class MembersDetailFormModule {}
