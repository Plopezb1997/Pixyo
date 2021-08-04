import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { User } from './entities/User';
import { EditEventComponent } from './view/event/edit-event/edit-event.component';
import { HomeEventComponent } from './view/event/home-event/home-event.component';
import { JoinEventComponent } from './view/event/join-event/join-event.component';
import { KeyEventComponent } from './view/event/key-event/key-event.component';
import { NewEventComponent } from './view/event/new-event/new-event.component';
import { PhotoUploadedComponent } from './view/event/photo-uploaded/photo-uploaded.component';
//import { RegisterLoginComponent } from './view/event/register-login/register-login.component';


//import { UploadPicComponent } from './view/event/upload-pic/upload-pic.component';

import { RegisterLoginComponent } from './view/user/register-login/register-login.component';
import { UploadPicComponent } from './view/user/upload-pic/upload-pic.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
    data:Event
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterLoginComponent,
    data:Event
  },
  {
    path: 'editEvent',
    pathMatch: 'full',
    component: EditEventComponent,
    data:Event
  },
  {
    path: 'newEvent',
    pathMatch: 'full',
    component: NewEventComponent
  },
  {
    path: 'keyEvent',
    pathMatch: 'full',
    component: KeyEventComponent
  },
  {
    path: 'homeEvent',
    pathMatch: 'full',
    component: HomeEventComponent,
    data:User
  },
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
    data:User
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
