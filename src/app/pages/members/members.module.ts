import { NgModule } from "@angular/core";

import { MembersRoutingModule } from "./members-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MembersComponent } from "./members.component";
import { MembersService } from "./members.service";
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
  NzMessageService
} from "ng-zorro-antd";

@NgModule({
  imports: [
    MembersRoutingModule,
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
    ReactiveFormsModule
  ],
  declarations: [MembersComponent],
  exports: [MembersComponent],
  providers: [MembersService, NzMessageService]
})
export class MembersModule {}
