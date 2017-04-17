import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { DatepickerModule } from 'ng2-bootstrap'
import { TagInputModule } from 'ng2-tag-input';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { EventsComponent } from './components/event/index/events.component';
import { EventComponent } from './components/event/show/event.component';
import { NewEventComponent } from './components/event/new/new-event.component';
import { EditEventComponent } from './components/event/edit/edit-event.component';

import { TagsQueryComponent } from './components/tag/query/tags-query.component';
import { TagComponent } from './components/tag/show/tag.component';

import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { ProfileComponent } from './components/profile/index/profile.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { EventService } from './services/event.service';
import { TagService } from './services/tag.service';
import { UserService } from './services/user.service';
import { FormService } from './services/form.service';

import { AuthGuard, OrgGuard, PrtGuard } from './guards/auth.guard';

import { ProfileDashboardComponent } from './components/profile/dashboard/profile-dashboard.component';
import { ProfileFullComponent } from './components/profile/full/profile-full.component';
import { ProfileMyEventsComponent } from './components/profile/my-events/profile-my-events.component';
import { ProfileJoinedEventsComponent } from './components/profile/joined-events/profile-joined-events.component';
import { JoinedUsersComponent } from './components/user/joined-users/joined-users.component';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { UploadCoverComponent } from './components/event/upload-cover/upload-cover.component';
import { MyFormTemplatesComponent } from './components/profile/my-form-templates/my-form-templates.component';
import { UploadTemplateComponent } from './components/form/upload-template/upload-template.component';
import { DownloadTemplateComponent } from './components/download/template/download-template.component';
import { UploadFormComponent } from './components/form/upload-form/upload-form.component';

const profileRoutes: Routes = [
  { path: '', redirectTo: '/profile/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ProfileDashboardComponent },
  { path: 'full', component: ProfileFullComponent },
  { path: 'events', component: ProfileMyEventsComponent },
  { path: 'joined', component: ProfileJoinedEventsComponent },
  { path: 'tpls', component: MyFormTemplatesComponent }
];

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
    ForbiddenComponent,
    TagsQueryComponent,
    NotFoundComponent,
    NotFoundComponent,
    TagComponent,
    ProfileDashboardComponent,
    ProfileFullComponent,
    ProfileMyEventsComponent,
    ProfileJoinedEventsComponent,
    EditEventComponent,
    JoinedUsersComponent,
    FileUploadComponent,
    FileSelectDirective,
    FileDropDirective,
    UploadCoverComponent,
    MyFormTemplatesComponent,
    UploadTemplateComponent,
    DownloadTemplateComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TagInputModule,
    Ng2PaginationModule,
    DatepickerModule.forRoot(),
    //ImageUploadModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
                { path: 'upload', component: FileUploadComponent },
      { path: 'events', redirectTo: '/events/page/1', pathMatch: 'full' },
      { path: 'events/page/:page', component: EventsComponent },
      { path: 'events/new', component: NewEventComponent, canActivate: [AuthGuard, OrgGuard] },
      { path: 'events/:id', component: EventComponent },
      { path: 'events/:id/cover', component: UploadCoverComponent },
      { path: 'events/edit/:id', component: EditEventComponent, canActivate: [AuthGuard, OrgGuard] },
      { path: 'tags', component: TagsQueryComponent },
      { path: 'tags/:tag', component: TagComponent },
      { path: 'tags/:tag/page/:page', component: TagComponent },
      { path: 'tpls/upload', component: UploadTemplateComponent, canActivate: [AuthGuard, OrgGuard] },
      { path: 'forms/upload/:tplid', component: UploadFormComponent, canActivate: [AuthGuard, PrtGuard] },
      { path: 'download/tpl/:id/:tpl', component: DownloadTemplateComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: profileRoutes },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
    ])
  ],
  providers: [
    EventService,
    AuthService,
    ApiService,
    UserService,
    TagService,
    FormService,
    AuthGuard,
    OrgGuard,
    PrtGuard,
    { provide: LOCALE_ID, useValue: "ru-RU" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
