import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ApplicationStates from '../../state/app.state';
import { MovieState } from './movie.reducer';

export interface State extends ApplicationStates.State {
    movies: MovieState;
}

// * Selectors

const getMovieFeatureState = createFeatureSelector<MovieState>('movies');

export const getShowGenre = createSelector(
    getMovieFeatureState,
    state => state.showGenre
)

export const getCurrentMovieId = createSelector(
    getMovieFeatureState,
    state => state.currentMovieId
)

export const getCurrentMovie = createSelector(
    getMovieFeatureState,
    getCurrentMovieId,
    (state, currentMovieId) => {
        if (currentMovieId === 0) {
            return {
                id: 0,
                movieTitle: 'New Movie',
                director: '',
                genre: '',
                rating: 0
            }
        } else {
            return currentMovieId ? state.movies.find(m => m.id === currentMovieId) : null;
        }
    }
);

export const getMovies = createSelector(
    getMovieFeatureState,
    state => state.movies
)

export const getError = createSelector(
    getMovieFeatureState,
    state => state.error
)