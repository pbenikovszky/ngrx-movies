import { createAction, props } from '@ngrx/store';
import { Movie } from '../../movies';

export const loadMoviesSuccess = createAction(
    '[Movie API] Load Movies Success',
    props<{ movies: Movie[] }>()
)

export const loadMoviesFailure = createAction(
    '[Movie API] Load Movies Fail',
    props<{ error: string }>()
)

export const createMovieSuccess = createAction(
    '[Movie API] Create Movies Success',
    props<{ movie: Movie }>()
)

export const createMovieFailure = createAction(
    '[Movie API] Create Movies Fail',
    props<{ error: string }>()
)

export const updateMovieSuccess = createAction(
    '[Movie API] Update Movies Success',
    props<{ movie: Movie }>()
)

export const updateMovieFailure = createAction(
    '[Movie API] Update Movies Fail',
    props<{ error: string }>()
)

export const deleteMovieSuccess = createAction(
    '[Movie API] Delete Movie Success',
    props<{ movieId: number }>()
)

export const deleteMovieFailure = createAction(
    '[Movie API] Delete Movies Fail',
    props<{ error: string }>()
)