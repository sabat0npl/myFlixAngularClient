import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
/**
 * This component will render the NavBar.
 */
export class NavBarComponent implements OnInit {
  constructor(  public snackBar: MatSnackBar,
    public router: Router) { }
  ngOnInit(): void {
  }

  logOutUser(): void {
    localStorage.clear;
    this.router.navigate(['welcome']);
    this.snackBar.open('You have logged out', 'OK', {
      duration: 2000
    });
  }
}