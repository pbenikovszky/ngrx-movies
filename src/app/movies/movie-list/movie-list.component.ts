import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../movies';

@Component({
  selector: 'nd-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {

  listTitle = 'Movies';

  @Input() errorMessage: string;
  @Input() displayGenre: boolean;
  @Input() selectedMovie: Movie;
  @Input() movies: Movie[];

  @Output() showGenreChanged = new EventEmitter<boolean>();
  @Output() initializeNewMovie = new EventEmitter<void>();
  @Output() movieWasSelected = new EventEmitter<Movie>();

  displayGenreChanged(): void {
    this.showGenreChanged.emit();
  }

  newMovie(): void {
    this.initializeNewMovie.emit();
  }

  movieSelected(movie: Movie): void {
    this.movieWasSelected.emit(movie);
  }

}
