import { Injectable } from '@angular/core';
import { Movie } from './movies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    private moviesURL = 'api/movies';

    constructor(private http: HttpClient) {
    }

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.moviesURL)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    createMovie(movie: Movie): Observable<Movie> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const newMovie = { ...movie, id: null };
        return this.http.post<Movie>(this.moviesURL, newMovie, { headers })
            .pipe(
                tap(data => console.log('createMovie: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteMovie(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.moviesURL}/${id}`;
        return this.http.delete<Movie>(url, { headers })
            .pipe(
                tap(data => console.log('deleteProduct: ' + id)),
                catchError(this.handleError)
            );
    }


    updateMovie(movie: Movie): Observable<Movie> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.moviesURL}/${movie.id}`;
        return this.http.put<Movie>(url, movie, { headers })
            .pipe(
                tap(() => console.log('updateMovie: ' + movie.id)),
                // Return the product on an update
                map(() => movie),
                catchError(this.handleError)
            );
    }


    private handleError(err: any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

}