import { createReducer, on } from '@ngrx/store';
import { Movie } from '../movies';
import { MoviePageActions, MovieApiActions } from './actions'

export interface MovieState {
    showGenre: boolean;
    currentMovieId: number | null;
    movies: Movie[];
    error: string;
}

const initialState: MovieState = {
    showGenre: true,
    currentMovieId: null,
    movies: [],
    error: ''
}

// * Reducer

export const movieReducer = createReducer(
    initialState,
    on(MoviePageActions.toggleGenre, (state): MovieState => {
        return {
            ...state,
            showGenre: !state.showGenre
        };
    }),

    on(MoviePageActions.setCurrentMovie, (state, action): MovieState => {
        return {
            ...state,
            currentMovieId: action.currentMovieId
        }
    }),

    on(MoviePageActions.clearCurrentMovie, (state): MovieState => {
        return {
            ...state,
            currentMovieId: null
        };
    }),

    on(MoviePageActions.initializeCurrentMovie, (state): MovieState => {
        return {
            ...state,
            currentMovieId: 0
        };
    }),

    on(MovieApiActions.loadMoviesSuccess, (state, action): MovieState => {
        return {
            ...state,
            movies: action.movies,
            error: ''
        }
    }),

    on(MovieApiActions.loadMoviesFailure, (state, action): MovieState => {
        return {
            ...state,
            movies: [],
            error: action.error
        }
    }),

    on(MovieApiActions.createMovieSuccess, (state, action): MovieState => {
        return {
            ...state,
            movies: [...state.movies, action.movie],
            currentMovieId: action.movie.id,
            error: ''
        }
    }),

    on(MovieApiActions.createMovieFailure, (state, action): MovieState => {
        return {
            ...state,
            error: action.error
        }
    }),

    on(MovieApiActions.updateMovieSuccess, (state, action): MovieState => {
        const updatedMovies = state.movies.map(
            m => m.id === action.movie.id ? action.movie : m
        )
        return {
            ...state,
            movies: updatedMovies,
            currentMovieId: action.movie.id,
            error: ''
        }
    }),

    on(MovieApiActions.updateMovieFailure, (state, action): MovieState => {
        return {
            ...state,
            error: action.error
        }
    }),

    on(MovieApiActions.deleteMovieSuccess, (state, action): MovieState => {
        const updatedMovies = state.movies.filter(m => m.id !== action.movieId)
        return {
            ...state,
            movies: updatedMovies,
            currentMovieId: null,
            error: ''
        }
    }),

    on(MovieApiActions.deleteMovieFailure, (state, action): MovieState => {
        return {
            ...state,
            error: action.error
        }
    })

)