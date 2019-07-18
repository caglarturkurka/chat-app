import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { LoginComponent } from './components/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ChatWindowComponent,
    LoginComponent,
    UserProfileComponent,
    SettingComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxWebstorageModule.forRoot({prefix: 'caglar-chat', separator: '-'}),
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
