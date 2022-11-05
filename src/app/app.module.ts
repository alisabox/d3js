import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ApiService } from "./shared/services/api.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
