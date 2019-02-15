
import { FavouriteJokeListComponent } from './favourite-joke-list/favourite-joke-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokeCardComponent } from './joke-card/joke-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatButtonModule, MatIconModule,
         MatTooltipModule, MatSlideToggleModule } from '@angular/material';
import { JokesListComponent } from './joke-list/jokes-list.component';
import { JokesViewComponent } from './jokes-view.component';
import { MatTabsModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    JokeCardComponent,
    FavouriteJokeListComponent,
    JokesListComponent,
    JokesViewComponent
  ],
  exports: [
    JokesViewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSnackBarModule
  ]
})
export class JokesViewModule { }
