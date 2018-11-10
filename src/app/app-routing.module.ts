import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { StartComponent } from './start/start.component';
import { FoundComponent } from './found/found.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { RewardComponent } from './reward/reward.component';

const routes: Routes = [
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'map/:index',
    component: MapComponent
  },
  {
    path: 'found/:index',
    component: FoundComponent
  },
  {
    path: 'challenge/:index',
    component: ChallengeComponent
  },
  {
    path: 'reward/:index',
    component: RewardComponent
  },
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
