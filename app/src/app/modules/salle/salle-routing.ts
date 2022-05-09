import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from 'src/app/views/salle/list/list.component';
import {EditComponent }from '../../views/salle/edit/edit.component';
import { AuthGuard } from 'src/app/authentification/auth.guard';
const routes: Routes = [
  {
    component: ListComponent,
    
    path: 'liste_salles',
    pathMatch: 'full',
    //canActivate:[AuthGuard]
  }, 
  {
    
    component:EditComponent,
    path: 'edit_salle/:id',
    pathMatch: 'full',
    //canActivate:[AuthGuard]
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SalleRoutingModule {}
