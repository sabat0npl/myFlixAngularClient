import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

/** This variable contains the URL for the API */
const apiUrl = 'https://brunoza-api.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**Injecting the HttpClient module to the constructor params will provide
   * HttpClient to the entire class, making it available via this.http
   */
  constructor(private http: HttpClient, private router: Router) {}
  /**
   * Used for registering a new user
   * @returns Adds a new user to the database
   * @param userDetails An object containing the user's inputted info
   */
  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * Handles user login HTTP request
   * @param userDetails
   * @returns bearer authentication token
   */
  //User Login
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(
        apiUrl +
          'login?Username=' +
          userDetails.Username +
          '&Password=' +
          userDetails.Password,
        null
      )
      .pipe(catchError(this.handleError));
  }
  /**
   * API call to fetch all movies in database
   * @returns array with all the movies in database
   */
  //Get All Movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * @returns Returns the director data
   */
  //Get Director
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * @returns Returns the genre info
   */
  //Get Genre
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * @returns Returns the user's data
   * @param user An object containing the user's name
   */
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
    /**
   * Adds a movie to the favoured movies list
   * @returns Returns an array of the movies favoured
   * @param id The id of the selected movie
   */
  // Adds user favorite movie
  addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${user}/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Removes a movie to the favoured movies list
   * @returns Returns an array of the movies favoured
   * @param id The id of the selected movie
   */
  // Deletes user favorite movies
  removeFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Enables a user to update their user data
   * @returns The updated data of the user
   * @param userDetails An object containing a user's details
   */
  // Edit user info
  EditUserInfo(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Allows a user to delete their account
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
