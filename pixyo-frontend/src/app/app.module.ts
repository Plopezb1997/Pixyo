import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UploadPicComponent } from './view/user/upload-pic/upload-pic.component';
import { NewEventComponent } from './view/event/new-event/new-event.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RegisterLoginComponent } from './view/user/register-login/register-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeEventComponent } from './view/event/home-event/home-event.component';

@NgModule({
  declarations: [AppComponent, RegisterLoginComponent, UploadPicComponent,HomeEventComponent, NewEventComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, authInterceptorProviders, AuthService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
