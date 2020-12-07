import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Movie } from './movies';

@Injectable({
  providedIn: 'root'
})
export class MovieData implements InMemoryDbService {

  createDb() {
    let movies: Movie[] = [
      {
        id: 1,
        movieTitle: 'Star Wars I - Phantom Menace',
        genre: 'sci-fi',
        director: 'George Lucas',
        rating: 7.8
      },
      {
        id: 2,
        movieTitle: 'The Lord of the Rings: The Fellowship of the Ring',
        genre: 'fantasy',
        director: 'Peter Jackson',
        rating: 8.7
      },
      {
        id: 3,
        movieTitle: 'Spider-Man: Homecoming',
        genre: 'superhero movie',
        director: 'Jon Watts',
        rating: 7.3
      },
      {
        id: 4,
        movieTitle: 'Star Wars V - The Empire strikes back',
        genre: 'sci-fi',
        director: 'Irvin Kershner',
        rating: 9.3
      },
      {
        id: 5,
        movieTitle: 'The Shining',
        genre: 'psychological horror',
        director: 'Stanley Kubrick',
        rating: 8.5
      },
      {
        id: 6,
        movieTitle: 'Green Book',
        genre: 'comedy-drama',
        director: 'Peter Farrelly',
        rating: 8.0
      }
    ];
    return { movies };
  }

}
