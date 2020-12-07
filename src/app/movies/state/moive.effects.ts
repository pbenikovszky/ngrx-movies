import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { MovieService } from '../movies.service';
import { MoviePageActions, MovieApiActions } from './actions'


@Injectable({
    providedIn: 'root'
})
export class MovieEffects {

    constructor(private actions$: Actions, private movieService: MovieService) { }

    loadMovies$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MoviePageActions.loadMovies),
            mergeMap(action => this.movieService.getMovies().pipe(
                map(movies => MovieApiActions.loadMoviesSuccess({ movies })),
                catchError(error => of(MovieApiActions.loadMoviesFailure({ error })))
            ))
        )
    })

    createMovie$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MoviePageActions.createMovie),
            concatMap(action => this.movieService.createMovie(action.movie).pipe(
                map(movie => MovieApiActions.createMovieSuccess({ movie })),
                catchError(error => of(MovieApiActions.createMovieFailure({ error })))
            ))
        )
    })

    updateMovie$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MoviePageActions.updateMovie),
            concatMap(action => this.movieService.updateMovie(action.movie).pipe(
                map(movie => MovieApiActions.updateMovieSuccess({ movie })),
                catchError(error => of(MovieApiActions.updateMovieFailure({ error })))
            ))
        )
    })

    deleteMovie$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MoviePageActions.deleteMovie),
            mergeMap(action => this.movieService.deleteMovie(action.movieId).pipe(
                map(() => MovieApiActions.deleteMovieSuccess({ movieId: action.movieId })),
                catchError(error => of(MovieApiActions.deleteMovieFailure({ error })))
            ))
        )
    })

}