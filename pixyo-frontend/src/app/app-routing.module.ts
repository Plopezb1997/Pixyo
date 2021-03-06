import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { User } from './entities/User';
import { AuthGuardService } from './helpers/auth.guard';
import { EditEventComponent } from './view/event/edit-event/edit-event.component';
import { HomeEventComponent } from './view/event/home-event/home-event.component';
import { JoinEventComponent } from './view/event/join-event/join-event.component';
import { KeyEventComponent } from './view/event/key-event/key-event.component';
import { NewEventComponent } from './view/event/new-event/new-event.component';
import { PhotoUploadedComponent } from './view/event/photo-uploaded/photo-uploaded.component';
//import { RegisterLoginComponent } from './view/event/register-login/register-login.component';
//import { ShareEventComponent } from './view/event/share-event/share-event.component';
//import { UploadPicComponent } from './view/event/upload-pic/upload-pic.component';
import { RegisterLoginComponent } from './view/user/register-login/register-login.component';
import { UploadPicComponent } from './view/user/upload-pic/upload-pic.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'joinEvent',
    pathMatch: 'full',
    component: JoinEventComponent,
    data:Event,
    //canActivate: [AuthGuardService] 
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterLoginComponent,
    data:Event
  },
  {
    path: 'editEvent/:id',
    pathMatch: 'full',
    component: EditEventComponent,
    data:Event,
    //canActivate: [AuthGuardService] 
  },
  {
    path: 'newEvent',
    pathMatch: 'full',
    component: NewEventComponent,
    //canActivate: [AuthGuardService] 
  },
  {
    path: 'keyEvent',
    pathMatch: 'full',
    component: KeyEventComponent,
    //canActivate: [AuthGuardService] 
  },
  {
    path: 'homeEvent',
    pathMatch: 'full',
    component: HomeEventComponent,
    data:User,
    //canActivate: [AuthGuardService] 
  },
 /* {
    path: 'shareEvent',
    pathMatch: 'full',
    component: ShareEventComponent,
    data:User,
    //canActivate: [AuthGuardService] 
  },*/
  {
    path: 'uploadPic',
    pathMatch: 'full',
    component: UploadPicComponent,
    data:User
  },
  {
    path: 'picUploaded',
    pathMatch: 'full',
    component: PhotoUploadedComponent,
    data:User,
    //canActivate: [AuthGuardService] 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
