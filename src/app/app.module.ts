import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { EventService } from './event/event.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventsComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'events', component: EventsComponent },
      { path: 'events/:id', component: EventComponent }
    ])
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
