import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { StartComponent } from './start/start.component';
import { FoundComponent } from './found/found.component';

const routes: Routes = [
  {
    path: 'map/:index',
    component: MapComponent
  },
  {
    path: 'found/:index',
    component: FoundComponent
  },
  {
    path: 'start',
    component: StartComponent
  },
  { path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
