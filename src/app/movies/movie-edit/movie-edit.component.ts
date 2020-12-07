import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { getCurrentMovie, State } from '../state';

import { Movie } from '../movies';
import { MovieService } from '../movies.service';
import { MoviePageActions } from '../state/actions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'nd-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  pageTitle = 'Edit movie';
  errorMessage: ''

  movieForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  movie$: Observable<Movie | null>;

  constructor(private fb: FormBuilder, private movieService: MovieService, private store: Store<State>) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      movieTitle: {
        required: 'Movie title is required.',
        minlength: 'Movie title must be at least three characters.',
        maxlength: 'Movie title cannot exceed 50 characters.'
      },
      director: {
        required: 'Director is required.'
      },
      rating: {
        range: 'Rate the movie between 1 (lowest) and 10 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.movieForm = this.fb.group({
      movieTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      director: ['', Validators.required],
      rating: ['', NumberValidators.range(1, 10)],
      genre: ''
    });

    this.movie$ = this.store.select(getCurrentMovie).pipe(tap(
      currentMovie => this.displayMovie(currentMovie))
    );

    // Watch for value changes for validation
    this.movieForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.movieForm)
    );

  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.movieForm);
  }

  displayMovie(movie: Movie | null): void {
    if (movie) {
      this.movieForm.reset();

      if (movie.id === 0) {
        this.pageTitle = 'Add Movie';
      } else {
        this.pageTitle = `Edit Movie: ${movie.movieTitle}`;
      }

      this.movieForm.patchValue({
        movieTitle: movie.movieTitle,
        director: movie.director,
        rating: movie.rating,
        genre: movie.genre
      });
    }
  }

  cancelEdit(movie: Movie): void {
    this.displayMovie(movie);
  }

  deleteMovie(movie: Movie): void {
    if (movie && movie.id) {
      if (confirm(`Really delete the movie: ${movie.movieTitle}?`)) {
        this.store.dispatch(MoviePageActions.deleteMovie({ movieId: movie.id }))
      }
    } else {
      this.store.dispatch(MoviePageActions.clearCurrentMovie());
    }
  }

  saveMovie(originalMovie: Movie): void {
    if (this.movieForm.valid) {
      if (this.movieForm.dirty) {
        const movie = { ...originalMovie, ...this.movieForm.value };

        if (movie.id === 0) {
          this.store.dispatch(MoviePageActions.createMovie({ movie }))
        } else {
          this.store.dispatch(MoviePageActions.updateMovie({ movie }))
        }


      }
    }
  }

}
