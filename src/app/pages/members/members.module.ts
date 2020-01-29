import { NgModule } from "@angular/core";

import { MembersRoutingModule } from "./members-routing.module";
import { FormsModule } from "@angular/forms";
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
  NzCardModule
} from "ng-zorro-antd";

@NgModule({
  imports: [
    MembersRoutingModule,
    CommonModule,
    NzButtonModule,
    NzPageHeaderModule,
    FormsModule,
    NzInputModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NgZorroAntdModule,
    NzGridModule,
    NzCardModule
  ],
  declarations: [MembersComponent],
  exports: [MembersComponent],
  providers: [MembersService]
})
export class MembersModule {}
