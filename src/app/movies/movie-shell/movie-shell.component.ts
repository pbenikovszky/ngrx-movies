import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentMovie, getError, getMovies, getShowGenre, State } from '../state';
import { Movie } from '../movies';
import { MoviePageActions } from '../state/actions';

@Component({
  selector: 'nd-movie-shell',
  templateUrl: './movie-shell.component.html',
  styleUrls: ['./movie-shell.component.css']
})
export class MovieShellComponent implements OnInit {

  movies$: Observable<Movie[]>;
  displayGenre$: Observable<boolean>;
  selectedMovie$: Observable<Movie>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {

    this.store.dispatch(MoviePageActions.loadMovies());

    this.selectedMovie$ = this.store.select(getCurrentMovie);
    this.movies$ = this.store.select(getMovies);
    this.displayGenre$ = this.store.select(getShowGenre);
    this.errorMessage$ = this.store.select(getError)

  }

  showGenreChanged(): void {
    this.store.dispatch(MoviePageActions.toggleGenre());
  }

  movieSelected(movie: Movie): void {
    this.store.dispatch(MoviePageActions.setCurrentMovie({ currentMovieId: movie.id }));
  }

  newMovie(): void {
    this.store.dispatch(MoviePageActions.initializeCurrentMovie());
  }
}
