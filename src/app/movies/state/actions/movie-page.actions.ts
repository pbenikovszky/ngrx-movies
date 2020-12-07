import { createAction, props } from '@ngrx/store';
import { Movie } from '../../movies';

export const toggleGenre = createAction(
    '[Movie List Page] Toggle Genre'
)

export const setCurrentMovie = createAction(
    '[Movie List Page] Set Current Movie',
    props<{ currentMovieId: number }>()
)

export const clearCurrentMovie = createAction(
    '[Movie Edit Page] Clear Current Movie'
)

export const initializeCurrentMovie = createAction(
    '[Movie Edit Page] Initialize Current Movie'
)

export const loadMovies = createAction(
    '[Movie List Page] Load Movies'
)

export const createMovie = createAction(
    '[Movie Edit Page] Create Movies',
    props<{ movie: Movie }>()
)

export const updateMovie = createAction(
    '[Movie Edit Page] Update Movies',
    props<{ movie: Movie }>()
)

export const deleteMovie = createAction(
    '[Movie Edit Page] Delete Movie',
    props<{ movieId: number }>()
)

