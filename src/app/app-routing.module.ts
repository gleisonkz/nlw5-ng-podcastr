import { EpisodeDetailPageComponent } from 'src/app/pages/episode-detail/episode-detail.component';
import { HomePageComponent } from 'src/app/pages/home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'episode/:id', component: EpisodeDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
