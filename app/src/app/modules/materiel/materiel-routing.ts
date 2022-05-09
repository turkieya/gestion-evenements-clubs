import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from 'src/app/views/materiel/list/list.component';
//import { AddComponent } from 'src/app/views/member/add/add.component';
import {EditComponent }from '../../views/materiel/edit/edit.component';
import { AuthGuard } from 'src/app/authentification/auth.guard';
const routes: Routes = [
  {
    component: ListComponent,
    
    path: 'liste_materiels', 
    pathMatch: 'full',
    //canActivate:[AuthGuard]
  }, 
  {
    component:EditComponent,
    path: 'edit_materiel/:id',
    pathMatch: 'full',
    //canActivate:[AuthGuard]
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MaterielRoutingModule {}
