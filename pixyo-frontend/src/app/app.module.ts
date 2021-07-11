import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowErrorsComponent } from './core/validation/show-errors/show-errors.component';
import { AuthGuardService } from './helpers/auth.guard';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AuthService } from './services/auth.service';
import { HomeEventComponent } from './view/event/home-event/home-event.component';
import { NewEventComponent } from './view/event/new-event/new-event.component';
import { RegisterLoginComponent } from './view/user/register-login/register-login.component';
import { UploadPicComponent } from './view/user/upload-pic/upload-pic.component';



@NgModule({
  declarations: [AppComponent, RegisterLoginComponent, UploadPicComponent,HomeEventComponent, NewEventComponent, ShowErrorsComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule, TranslateModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, authInterceptorProviders, AuthService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
