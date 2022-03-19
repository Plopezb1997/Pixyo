import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowErrorsComponent } from './core/validation/show-errors/show-errors.component';
import { AuthGuardService } from './helpers/auth.guard';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AuthService } from './services/core/auth.service';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { HomeEventComponent } from './view/event/home-event/home-event.component';
import { NewEventComponent } from './view/event/new-event/new-event.component';
import { RegisterLoginComponent } from './view/user/register-login/register-login.component';
import { UploadPicComponent } from './view/user/upload-pic/upload-pic.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AndroidService } from './services/core/android.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Device } from '@ionic-native/device';
import { VariablesService } from './services/core/variables.service';
import { UtilService } from './services/util.service';
import { EventResumedComponent } from './view/event/event-resumed/event-resumed.component';
import { CommonModule } from '@angular/common';
import { TakeFacePicComponent } from './view/user/take-face-pic/take-face-pic.component';
import { FaceApiService } from './services/faceApi.service';
import { CameraService } from './services/camera.service';
import { FilesService } from './services/files.service';
import { JoinEventComponent } from './view/event/join-event/join-event.component';
@NgModule({
  declarations: [AppComponent, 
    RegisterLoginComponent, 
    UploadPicComponent, 
    HomeEventComponent, 
    NewEventComponent, 
    ShowErrorsComponent, 
    EventResumedComponent, 
    TakeFacePicComponent,
  JoinEventComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    TranslateModule.forRoot(),
    CommonModule
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    AuthService, 
    AndroidService, 
    AndroidPermissions,
     Platform, 
     HTTP, 
     Camera, 
     File, 
     PhotoLibrary,//, AuthGuardService
    authInterceptorProviders,
    UserService, EventService, NativeStorage,
    VariablesService,
    UtilService,
    FaceApiService,
    CameraService,
    FilesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
