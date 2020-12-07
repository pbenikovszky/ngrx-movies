import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieShellComponent } from './movie-shell/movie-shell.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './state/movie.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './state/moive.effects';

const movieRoutes: Routes = [
  { path: '', component: MovieShellComponent }
];

@NgModule({
  declarations: [
    MovieShellComponent,
    MovieListComponent,
    MovieEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(movieRoutes),
    StoreModule.forFeature('movies', movieReducer),
    EffectsModule.forFeature([MovieEffects])
  ]
})
export class MoviesModule { }
