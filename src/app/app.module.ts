import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileSettingsComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
