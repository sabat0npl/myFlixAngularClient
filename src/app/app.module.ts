import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieDirectorComponent } from './movie-director/movie-director.component';
import { MovieGenreComponent } from './movie-genre/movie-genre.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { UserProfileDeleteComponent } from './user-profile-delete/user-profile-delete.component';

// Routing and Http
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// Materials for styling
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];
@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    MovieDirectorComponent,
    MovieGenreComponent,
    UserProfileComponent,
    NavBarComponent,
    UserProfileUpdateComponent,
    UserProfileDeleteComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,    
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule,
    FlexLayoutModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
