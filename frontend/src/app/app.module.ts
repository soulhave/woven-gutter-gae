import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FeatureSearch } from './filters/feature-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FeatureListComponent,
    FeatureSearch,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
