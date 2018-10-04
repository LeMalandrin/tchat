import { RoomComponent }  from './room/room.component';
import { RegisterComponent }  from './user/register/register.component';
import { LoginComponent }  from './user/login/login.component';
import { ChatComponent }  from './chat/chat.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'room', component: RoomComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent /*,canActivate: [AuthGuard] */  }
];
