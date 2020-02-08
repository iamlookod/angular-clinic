import { NgModule } from "@angular/core";

import { MedicinesRoutingModule } from "./medicines-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MedicinesComponent } from "./medicines.component";
import { MedicinesService } from "./medicines.service";
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
  NzDividerModule
} from "ng-zorro-antd";

@NgModule({
  imports: [
    MedicinesRoutingModule,
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
    NzDividerModule
  ],
  declarations: [MedicinesComponent],
  exports: [MedicinesComponent],
  providers: [MedicinesService, NzMessageService]
})
export class MedicinesModule {}
