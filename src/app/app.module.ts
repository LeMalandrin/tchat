import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { UserlistComponent } from './chat/userlist/userlist.component';
import { MessagelistComponent } from './chat/messagelist/messagelist.component';
import { ChatboxComponent } from './chat/chatbox/chatbox.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { SamePasswordsDirective } from './custom-validators/same-passwords.directive';
import { AuthGuard } from './auth.guard';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    NavbarComponent,
    UserlistComponent,
    MessagelistComponent,
    ChatboxComponent,
    ChatComponent,
    RegisterComponent,
    LoginComponent,
    SamePasswordsDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule, // for database
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
