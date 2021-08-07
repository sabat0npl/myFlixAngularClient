import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
/**
 * This component will render the modal about selected movie genre
 */
export class MovieGenreComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)  
  
  public data: {
    Name: string;
    Description: string;
    
  }) { }

  ngOnInit(): void {
  }

}