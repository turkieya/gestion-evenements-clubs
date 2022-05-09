import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
//import { AuthGuard } from 'src/app/authentification/auth.guard';

import { AuthGuard } from './modules/shared/auth.guard';

const routes: Routes = [{
  path : '',
  component : LoginComponent
},
{path: 'acceuil', component: DashboardComponent,
  children :[
   
    {
      path: 'membre',
      loadChildren: () =>
        import('./modules/member/member-module').then(
          (m) => m.UserModule
        )
      
    },
    {
      path: 'materiel',
      loadChildren: () =>
        import('./modules/materiel/materiel-module').then(
          (m) => m.MaterielModule,
        ),
      
    },
   
    {
      path: 'demande',
      loadChildren: () =>
        import('./modules/demande/demande-module').then(
          (m) => m.DemandeModule,
        ),
      
    },
    {
      path: 'calendrier',
      loadChildren: () =>
        import('./modules/calendar/calendar-module').then(
          (m) => m.CalendarModule,
        ),
      
    },
    {
      path: 'salle',
      loadChildren: () =>
        import('./modules/salle/salle-module').then(
          (m) => m.SalleModule,
        ),
      
    }
 

  ]
},

{
  path:'**',
  component:Page404Component
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
