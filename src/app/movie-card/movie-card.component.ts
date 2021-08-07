// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
/**
 * This component will render all the movie cards
 */
export class MovieCardComponent {
  movies: any[] = [];
  favoritemovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  /**
   * On initialization both {@link getMovies} and {@link favedMovies} will run
   * returning all the movies and the user's favoured movies list
   */
  ngOnInit(): void {
    this.getMovies();
    this.favMovies();
  }
  /**
   * Retrieves all the movies from the database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  /**
   * Retrieves the list of favoured movies
   */
  favMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoritemovies = resp.Favourites;
    });
  }
  /**
   * Checks to see if the movie favoured has been favoured already
   * @param movieID The id of the specific movie
   */
  isFavorite(movieID: string) {
    return this.favoritemovies.includes(movieID);
  }
  /**
   * Runs {@link isFavorite} to see if the clicked movie has been favoured or not.
   * If the movie has been favoured this function will unfavour it and vice versa.
   * @param id The id of the specific movie clicked
   */
  toggleFavouriteMovies(movieId: string): any {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.removeFavorite(movieId).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoritemovies.indexOf(movieId);
      return this.favoritemovies.splice(index, 1);
    } else {
      this.fetchApiData.addFavorite(movieId).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoritemovies.push(movieId);
  }
  /**
   * Retrieves info about a movie's director
   * @param name Name of the director
   * @param bio Biography of the director
   */
  getDirector(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: Name,
        Bio: Bio,
        Birth: Birth,
        Death: Death,
      },
    });
  }
  /**
   * Retrieves info about a movie's genre
   * @param name Name of the genre
   * @param description Description of the genre
   */
  getGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }
}
