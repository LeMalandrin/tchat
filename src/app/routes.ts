import { RoomComponent }  from './room/room.component';
import { RegisterComponent }  from './user/register/register.component';
import { LoginComponent }  from './user/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'room', component: RoomComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
