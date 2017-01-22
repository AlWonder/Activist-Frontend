import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { EventsComponent } from './components/event/index/events.component';
import { EventComponent } from './components/event/show/event.component';
import { NewEventComponent } from './components/event/new/new-event.component';
import { ProfileEventsComponent } from './components/event/profile/profile-events.component';

import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { ProfileComponent } from './components/user/profile/profile.component';

import { AuthGuard } from './guards/auth.guard';
import { OrgGuard } from './guards/org.guard';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventsComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    UnauthorizedComponent,
    NewEventComponent,
    ProfileEventsComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'events', component: EventsComponent },
      { path: 'events/new', component: NewEventComponent, canActivate: [AuthGuard, OrgGuard] },
      { path: 'events/:id', component: EventComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: '**', redirectTo: '/home' }
    ])
  ],
  providers: [
    EventService,
    AuthService,
    ApiService,
    UserService,
    AuthGuard,
    OrgGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
