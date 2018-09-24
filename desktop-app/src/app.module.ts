import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { PAGES, AppComponent } from './pages';

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, NgZorroAntdModule, AppRoutingModule],
  declarations: [...PAGES],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
