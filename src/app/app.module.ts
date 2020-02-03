import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IconsProviderModule } from "./icons-provider.module";
import { NgZorroAntdModule, NZ_I18N, th_TH } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import th from "@angular/common/locales/th";
import { NgProgressModule } from "ngx-progressbar";
import { GuardsCheckEnd, NavigationEnd } from "@angular/router";
import { NgProgressRouterModule } from "ngx-progressbar/router";

registerLocaleData(th);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgProgressModule,
    NgProgressRouterModule.withConfig({
      startEvents: [GuardsCheckEnd],
      completeEvents: [NavigationEnd],
      delay: 500
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: th_TH }],
  bootstrap: [AppComponent]
})
export class AppModule {}
