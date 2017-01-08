import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthService } from './auth.service';
import { EventService } from './event.service';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventsComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'events', component: EventsComponent },
      { path: 'events/:id', component: EventComponent },
      { path: 'signup', component: SignupComponent }
    ])
  ],
  providers: [
    EventService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
