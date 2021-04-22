import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeDetailPageComponent } from 'src/app/pages/episode-detail/episode-detail.component';
import { HomePageComponent } from 'src/app/pages/home/home.component';
import { EpisodeResolver } from 'src/app/resolvers/episode.resolver';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'episode/:id',
    component: EpisodeDetailPageComponent,
    resolve: { episode: EpisodeResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
