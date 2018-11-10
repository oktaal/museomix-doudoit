import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { StartComponent } from './start/start.component';
import { ExplainComponent } from './explain/explain.component';
import { FoundComponent } from './found/found.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { RewardComponent } from './reward/reward.component';
import { DragonComponent } from './dragon/dragon.component';
import { HpComponent } from './hp/hp.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StartComponent,
    ExplainComponent,
    FoundComponent,
    ChallengeComponent,
    RewardComponent,
    DragonComponent,
    HpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
