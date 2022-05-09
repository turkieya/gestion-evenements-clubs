import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from 'src/app/views/member/list/list.component';
import {EditComponent }from '../../views/member/edit/edit.component';
import { ProfileComponent } from 'src/app/views/member/profile/profile.component';

import { AuthGuard } from 'src/app/authentification/auth.guard';

const routes: Routes = [
  {
    component: ListComponent,
    
    path: 'liste_membres',
    pathMatch: 'full',
  }, {
    
    component:ProfileComponent ,
    path: 'edit_profile/:id',
    pathMatch: 'full',
    
  },
  {
    
    component:EditComponent,
    path: 'edit_membre/:id',
    pathMatch: 'full',
  },
  {
    
    component:ListComponent ,
    path: 'useradd',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule {}
