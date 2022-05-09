import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import { AuthInterceptor } from '../app/authentification/authconfig.interceptor';
import {  HTTP_INTERCEPTORS  }from '@angular/common/http';
import { UserModule } from '../../src/app/modules/member/member-module';
import { MaterielModule } from '../../src/app/modules/materiel/materiel-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemandeModule } from './modules/demande/demande-module';
import { AuthGuard } from './authentification/auth.guard';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { NgxPermissionsModule } from 'ngx-permissions';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    UserModule,
    MaterielModule,
    DemandeModule,
    NgxPermissionsModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut:3000,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
      }
    )
  ],
  providers: [AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
