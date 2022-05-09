import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from 'src/app/views/demande/list/list.component';
import { EditComponent } from 'src/app/views/demande/edit/edit.component';
import { AuthGuard } from 'src/app/authentification/auth.guard';
import { EventsComponent } from 'src/app/views/demande/events/events.component';
const routes: Routes = [
  {
    component: ListComponent,
    
    path: 'liste_demandes',
    pathMatch: 'full',
   // canActivate:[AuthGuard]

  }, 
  {
    component: EventsComponent, 
    path: 'liste_evenements',
    pathMatch: 'full',
  },
  {
    
    component:EditComponent,
    path: 'edit_demande/:id',
    pathMatch: 'full',
  },
 
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class DemandeRoutingModule {}
